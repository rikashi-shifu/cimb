package com.cimb.demo.payment;

import com.cimb.demo.config.AppProperties;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

/** Module 2 — payment instruction signing/verification (CWE-345). */
class PaymentSignerTest {

    private PaymentSigner signer() {
        AppProperties props = new AppProperties();
        props.getPayment().setSigningKey("test-payment-signing-secret");
        return new PaymentSigner(props);
    }

    @Test
    void verify_acceptsUnalteredInstruction() {
        PaymentSigner s = signer();
        String canonical = s.canonical("PAY-1", "250.00", "Shopee MY", "1111");
        String signature = s.sign(canonical);
        assertThat(s.verify(canonical, signature)).isTrue();
    }

    @Test
    void verify_rejectsAlteredAmount() {
        PaymentSigner s = signer();
        String signed = s.sign(s.canonical("PAY-1", "250.00", "Shopee MY", "1111"));
        // Attacker changes the amount after signing.
        String tampered = s.canonical("PAY-1", "999.00", "Shopee MY", "1111");
        assertThat(s.verify(tampered, signed)).isFalse();
    }

    @Test
    void verify_rejectsUnsignedRequest() {
        PaymentSigner s = signer();
        String canonical = s.canonical("PAY-1", "250.00", "Shopee MY", "1111");
        assertThat(s.verify(canonical, null)).isFalse();
        assertThat(s.verify(canonical, "")).isFalse();
        assertThat(s.verify(canonical, "not-a-real-signature")).isFalse();
    }
}
