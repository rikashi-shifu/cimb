package com.cimb.demo.common;

import org.springframework.stereotype.Component;

/**
 * Mock DuitNow / FPX payment rail. Per the project scope this is a single fake function that
 * reports success or failure — no real network call. It "declines" only on an obviously
 * invalid amount so the happy path is deterministic for the demo.
 */
@Component
public class FakeGateway {

    public record GatewayResult(boolean approved, String reference, String message) {
    }

    public GatewayResult authorize(java.math.BigDecimal amount) {
        String ref = "FPX" + Long.toHexString(System.nanoTime()).toUpperCase();
        if (amount == null || amount.signum() <= 0) {
            return new GatewayResult(false, ref, "Declined by gateway: invalid amount");
        }
        return new GatewayResult(true, ref, "Approved by DuitNow/FPX (mock)");
    }
}
