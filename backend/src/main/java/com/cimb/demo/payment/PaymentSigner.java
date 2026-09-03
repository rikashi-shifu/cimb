package com.cimb.demo.payment;

import com.cimb.demo.config.AppProperties;
import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

/**
 * Signs and verifies payment instructions with HMAC-SHA256 (Module 2, CWE-287 /
 * SR3).
 *
 * The canonical instruction binds the fields a payment must not be altered on:
 * reference, amount, merchant and the card's last 4 digits. A verifier
 * recomputes the HMAC from the SUBMITTED fields, so any tampering (e.g.
 * changing the amount after signing) invalidates the signature, and an unsigned
 * request has nothing to verify.
 */
@Component
public class PaymentSigner {

    private final byte[] key;

    public PaymentSigner(AppProperties props) {
        this.key = props.getPayment().getSigningKey().getBytes(StandardCharsets.UTF_8);
    }

    /**
     * Canonical string over the fields that authorise a specific payment.
     */
    public String canonical(String paymentRef, String amount, String merchant, String cardLast4) {
        return String.join("|", paymentRef, amount, merchant, cardLast4);
    }

    public String sign(String canonical) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(key, "HmacSHA256"));
            return Base64.getEncoder().encodeToString(mac.doFinal(canonical.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception e) {
            throw new IllegalStateException("Signing failed", e);
        }
    }

    /**
     * Constant-time verification that {@code signature} is a valid HMAC over
     * {@code canonical}.
     */
    public boolean verify(String canonical, String signature) {
        if (signature == null || signature.isBlank()) {
            return false;
        }
        String expected = sign(canonical);
        return constantTimeEquals(expected, signature);
    }

    private boolean constantTimeEquals(String a, String b) {
        if (a.length() != b.length()) {
            return false;
        }
        int result = 0;
        for (int i = 0; i < a.length(); i++) {
            result |= a.charAt(i) ^ b.charAt(i);
        }
        return result == 0;
    }
}
