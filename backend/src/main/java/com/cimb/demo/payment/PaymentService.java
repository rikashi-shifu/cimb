package com.cimb.demo.payment;

import com.cimb.demo.audit.AuditService;
import com.cimb.demo.auth.TotpService;
import com.cimb.demo.auth.User;
import com.cimb.demo.auth.UserRepository;
import com.cimb.demo.common.ApiException;
import com.cimb.demo.common.FakeGateway;
import com.cimb.demo.config.SecureModeState;
import com.cimb.demo.session.CurrentUser;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Module 2 — Payment authorization (CWE-345: Insufficient Verification of Data Authenticity, SR3).
 *
 * Secure Mode OFF (vulnerable): a payment completes with only card number, expiry and CVV — no
 *   OTP, no server-side verification of the instruction. This is the "non-3DS" behaviour.
 *
 * Secure Mode ON (fixed): the server requires a valid OTP AND a correctly signed payment
 *   instruction, and recomputes the signature over the SUBMITTED fields. Any unsigned or
 *   altered request (e.g. amount changed after signing) is rejected.
 */
@Service
public class PaymentService {

    private final PaymentRepository payments;
    private final PaymentSigner signer;
    private final TotpService totp;
    private final UserRepository users;
    private final SecureModeState secureMode;
    private final FakeGateway gateway;
    private final AuditService audit;

    public PaymentService(PaymentRepository payments, PaymentSigner signer, TotpService totp,
                          UserRepository users, SecureModeState secureMode, FakeGateway gateway,
                          AuditService audit) {
        this.payments = payments;
        this.signer = signer;
        this.totp = totp;
        this.users = users;
        this.secureMode = secureMode;
        this.gateway = gateway;
        this.audit = audit;
    }

    /**
     * Secure-mode step 1: produce a signed instruction and a demo OTP. In a real system the
     * signature would be minted by an HSM/3DS server; here it binds ref+amount+merchant+card.
     */
    public Map<String, Object> prepare(CurrentUser current, BigDecimal amount, String merchant, String cardNumber) {
        String paymentRef = "PAY-" + UUID.randomUUID();
        String cardLast4 = last4(cardNumber);
        String canonical = signer.canonical(paymentRef, amount.toPlainString(), merchant, cardLast4);
        String signature = signer.sign(canonical);
        User user = users.findByUsername(current.username()).orElseThrow();
        String demoOtp = totp.currentCode(user.getTotpSecret());
        return Map.of(
                "paymentRef", paymentRef,
                "amount", amount.toPlainString(),
                "merchant", merchant,
                "cardLast4", cardLast4,
                "signature", signature,
                "demoOtp", demoOtp);
    }

    public Map<String, Object> pay(CurrentUser current, PayCommand cmd) {
        String cardLast4 = last4(cmd.cardNumber());

        if (secureMode.isSecure()) {
            // (1) Verify the payment instruction is authentic and unaltered.
            String canonical = signer.canonical(
                    cmd.paymentRef(), cmd.amount().toPlainString(), cmd.merchant(), cardLast4);
            if (!signer.verify(canonical, cmd.signature())) {
                record(cardLast4, cmd, "REJECTED", "unsigned or altered instruction (CWE-345 blocked)");
                audit.record(current.username(), "PAYMENT_REJECTED", "bad signature amount=" + cmd.amount());
                throw ApiException.badRequest(
                        "Payment rejected: instruction is unsigned or was altered after signing.");
            }
            // (2) Require a valid OTP second factor.
            User user = users.findByUsername(current.username()).orElseThrow();
            if (!totp.verify(user.getTotpSecret(), cmd.otp())) {
                record(cardLast4, cmd, "REJECTED", "invalid OTP");
                audit.record(current.username(), "PAYMENT_REJECTED", "invalid OTP");
                throw ApiException.badRequest("Payment rejected: invalid or missing OTP.");
            }
        }

        FakeGateway.GatewayResult gw = gateway.authorize(cmd.amount());
        if (!gw.approved()) {
            record(cardLast4, cmd, "DECLINED", gw.message());
            throw ApiException.badRequest(gw.message());
        }

        String note = secureMode.isSecure()
                ? "OTP + signed instruction verified (3DS-equivalent)"
                : "NON-3DS: accepted with card details only (VULNERABLE)";
        Payment saved = record(cardLast4, cmd, "COMPLETED", note);
        audit.record(current.username(), "PAYMENT_COMPLETED",
                "amount=" + cmd.amount() + " merchant=" + cmd.merchant()
                        + " secure=" + secureMode.isSecure());

        return Map.of(
                "status", saved.getStatus(),
                "paymentId", saved.getId(),
                "gatewayRef", gw.reference(),
                "secureMode", secureMode.isSecure(),
                "note", note);
    }

    private Payment record(String cardLast4, PayCommand cmd, String status, String note) {
        Payment p = new Payment(UUID.randomUUID().toString(), Instant.now(), cmd.merchant(),
                cmd.amount(), cardLast4, status, secureMode.isSecure(), note);
        return payments.save(p);
    }

    public List<Map<String, Object>> recent() {
        return payments.findTop50ByOrderByCreatedAtDesc().stream().map(p -> Map.<String, Object>of(
                "id", p.getId(),
                "createdAt", p.getCreatedAt().toString(),
                "merchant", p.getMerchant(),
                "amount", p.getAmount(),
                "cardLast4", p.getCardLast4(),
                "status", p.getStatus(),
                "secureMode", p.isSecureMode(),
                "note", p.getNote() == null ? "" : p.getNote())).toList();
    }

    private String last4(String card) {
        if (card == null) {
            return "0000";
        }
        String digits = card.replaceAll("\\D", "");
        return digits.length() >= 4 ? digits.substring(digits.length() - 4) : digits;
    }

    /** Fields submitted to the pay endpoint. Signature/otp are only consulted in secure mode. */
    public record PayCommand(String paymentRef, BigDecimal amount, String merchant,
                             String cardNumber, String expiry, String cvv,
                             String signature, String otp) {
    }
}
