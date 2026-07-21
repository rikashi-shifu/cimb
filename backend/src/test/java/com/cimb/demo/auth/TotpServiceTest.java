package com.cimb.demo.auth;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

/** Module 1 — TOTP second factor (Secure2u simulation). */
class TotpServiceTest {

    private static final String SECRET = "JBSWY3DPEHPK3PXP";
    private final TotpService totp = new TotpService();

    @Test
    void currentCode_isSixDigits() {
        String code = totp.currentCode(SECRET);
        assertThat(code).hasSize(6);
        assertThat(code).matches("\\d{6}");
    }

    @Test
    void verify_acceptsCurrentCode() {
        String code = totp.currentCode(SECRET);
        assertThat(totp.verify(SECRET, code)).isTrue();
    }

    @Test
    void verify_rejectsWrongCode() {
        assertThat(totp.verify(SECRET, "000000")).isFalse();
        assertThat(totp.verify(SECRET, null)).isFalse();
        assertThat(totp.verify(SECRET, "12")).isFalse();
    }
}
