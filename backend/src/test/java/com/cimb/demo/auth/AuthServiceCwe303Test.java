package com.cimb.demo.auth;

import com.cimb.demo.session.Role;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Module 1 — the core CWE-303 behaviour: the vulnerable check truncates the submitted
 * password to the stored length, the secure check compares it in full.
 */
class AuthServiceCwe303Test {

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    private User demoUser(String password) {
        return new User("user", "User", Role.CUSTOMER,
                encoder.encode(password), password.length(), "JBSWY3DPEHPK3PXP");
    }

    private AuthService serviceWith() {
        // Only the encoder is exercised by the check methods; the rest are unused here.
        return new AuthService(null, encoder, null, null, null, null);
    }

    @Test
    void vulnerableCheck_acceptsCorrectPassword() {
        AuthService svc = serviceWith();
        assertThat(svc.vulnerableCheck(demoUser("Password1!"), "Password1!")).isTrue();
    }

    @Test
    void vulnerableCheck_acceptsPasswordPlusExtra_theBug() {
        AuthService svc = serviceWith();
        // CWE-303: correct password followed by ANY extra text still authenticates.
        assertThat(svc.vulnerableCheck(demoUser("Password1!"), "Password1!IGNORED_EXTRA")).isTrue();
    }

    @Test
    void vulnerableCheck_rejectsWrongPrefix() {
        AuthService svc = serviceWith();
        assertThat(svc.vulnerableCheck(demoUser("Password1!"), "WrongPass!")).isFalse();
    }

    @Test
    void secureCheck_rejectsPasswordPlusExtra_theFix() {
        AuthService svc = serviceWith();
        User user = demoUser("Password1!");
        assertThat(svc.secureCheck(user, "Password1!")).isTrue();          // exact match ok
        assertThat(svc.secureCheck(user, "Password1!IGNORED_EXTRA")).isFalse(); // extra rejected
    }
}
