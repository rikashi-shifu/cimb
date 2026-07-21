package com.cimb.demo.payment;

import com.cimb.demo.session.CurrentUser;
import com.cimb.demo.session.SessionService;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

/**
 * Module 2 — Payment authorization endpoints (CWE-345 / SR3).
 */
@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    private final PaymentService service;
    private final SessionService sessions;

    public PaymentController(PaymentService service, SessionService sessions) {
        this.service = service;
        this.sessions = sessions;
    }

    /** Secure-mode step 1: obtain a signed instruction + demo OTP for the intended payment. */
    @PostMapping("/prepare")
    public Map<String, Object> prepare(@RequestHeader(value = "X-Session-Token", required = false) String token,
                                       @RequestBody PrepareRequest req) {
        CurrentUser user = sessions.require(token);
        return service.prepare(user, req.amount(), req.merchant(), req.cardNumber());
    }

    /** Submit the payment. Behaviour depends on the global Secure Mode. */
    @PostMapping("/pay")
    public Map<String, Object> pay(@RequestHeader(value = "X-Session-Token", required = false) String token,
                                   @RequestBody PayRequest req) {
        CurrentUser user = sessions.require(token);
        return service.pay(user, new PaymentService.PayCommand(
                req.paymentRef(), req.amount(), req.merchant(), req.cardNumber(),
                req.expiry(), req.cvv(), req.signature(), req.otp()));
    }

    @GetMapping
    public Map<String, Object> list(@RequestHeader(value = "X-Session-Token", required = false) String token) {
        sessions.require(token);
        return Map.of("payments", service.recent());
    }

    public record PrepareRequest(BigDecimal amount, String merchant, String cardNumber) {
    }

    public record PayRequest(String paymentRef, BigDecimal amount, String merchant,
                             String cardNumber, String expiry, String cvv,
                             String signature, String otp) {
    }
}
