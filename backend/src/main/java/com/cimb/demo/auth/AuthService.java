package com.cimb.demo.auth;

import com.cimb.demo.audit.AuditService;
import com.cimb.demo.config.SecureModeState;
import com.cimb.demo.session.CurrentUser;
import com.cimb.demo.session.SessionService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Module 1 — Authentication (CWE-303: Incorrect Implementation of Authentication Algorithm, SR2).
 *
 * Secure Mode OFF (vulnerable): the password check truncates the submitted password to the
 *   length of the stored password before comparing, so the correct password followed by ANY
 *   extra characters still authenticates ("Password1!" and "Password1!junk" both pass). This
 *   reproduces the historical CIMB partial-password-match bug. No second factor.
 *
 * Secure Mode ON (fixed): a full, exact bcrypt comparison against the stored hash, followed
 *   by a mandatory TOTP second factor simulating Secure2u.
 */
@Service
public class AuthService {

    private final UserRepository users;
    private final BCryptPasswordEncoder encoder;
    private final TotpService totp;
    private final SecureModeState secureMode;
    private final SessionService sessions;
    private final AuditService audit;

    // Short-lived MFA challenges (secure mode step 1 -> step 2).
    private final Map<String, Challenge> challenges = new ConcurrentHashMap<>();

    public AuthService(UserRepository users, BCryptPasswordEncoder encoder, TotpService totp,
                       SecureModeState secureMode, SessionService sessions, AuditService audit) {
        this.users = users;
        this.encoder = encoder;
        this.totp = totp;
        this.secureMode = secureMode;
        this.sessions = sessions;
        this.audit = audit;
    }

    public LoginResult login(String username, String password) {
        User user = users.findByUsername(username).orElse(null);
        if (user == null) {
            audit.record(username, "LOGIN_FAILED", "unknown user (secure=" + secureMode.isSecure() + ")");
            return LoginResult.failure("Invalid credentials");
        }

        boolean passwordOk = secureMode.isSecure()
                ? secureCheck(user, password)
                : vulnerableCheck(user, password);

        if (!passwordOk) {
            audit.record(username, "LOGIN_FAILED", "bad password (secure=" + secureMode.isSecure() + ")");
            return LoginResult.failure("Invalid credentials");
        }

        if (secureMode.isSecure()) {
            // Fixed: require the TOTP second factor before issuing a session.
            String challengeId = UUID.randomUUID().toString();
            challenges.put(challengeId, new Challenge(username, Instant.now().plusSeconds(120)));
            String demoCode = totp.currentCode(user.getTotpSecret()); // shown on screen for the demo
            audit.record(username, "LOGIN_PASSWORD_OK", "awaiting TOTP (secure)");
            return LoginResult.mfaRequired(challengeId, demoCode);
        }

        // Vulnerable: no second factor — issue a session immediately.
        String token = sessions.create(toCurrentUser(user));
        audit.record(username, "LOGIN_SUCCESS", "no MFA (VULNERABLE mode)");
        return LoginResult.success(token, toCurrentUser(user));
    }

    public LoginResult verifyOtp(String challengeId, String code) {
        Challenge challenge = challenges.get(challengeId);
        if (challenge == null || challenge.expiresAt().isBefore(Instant.now())) {
            challenges.remove(challengeId);
            return LoginResult.failure("OTP challenge expired — please log in again");
        }
        User user = users.findByUsername(challenge.username()).orElse(null);
        if (user == null) {
            return LoginResult.failure("Invalid credentials");
        }
        if (!totp.verify(user.getTotpSecret(), code)) {
            audit.record(user.getUsername(), "OTP_FAILED", "invalid TOTP");
            return LoginResult.failure("Invalid OTP");
        }
        challenges.remove(challengeId);
        String token = sessions.create(toCurrentUser(user));
        audit.record(user.getUsername(), "LOGIN_SUCCESS", "TOTP verified (SECURE mode)");
        return LoginResult.success(token, toCurrentUser(user));
    }

    /**
     * VULNERABLE (CWE-303): compare only the first {@code storedLength} characters of the
     * submission, ignoring any trailing characters. Correct password + extra text => pass.
     */
    boolean vulnerableCheck(User user, String submitted) {
        if (submitted == null) {
            return false;
        }
        int n = user.getPasswordLength();
        String truncated = submitted.length() >= n ? submitted.substring(0, n) : submitted;
        return encoder.matches(truncated, user.getPasswordHash());
    }

    /** FIXED: full, exact bcrypt comparison of the entire submitted password. */
    boolean secureCheck(User user, String submitted) {
        return submitted != null && encoder.matches(submitted, user.getPasswordHash());
    }

    private CurrentUser toCurrentUser(User user) {
        return new CurrentUser(user.getUsername(), user.getDisplayName(), user.getRole());
    }

    private record Challenge(String username, Instant expiresAt) {
    }

    /** Result of a login attempt, shaped for the JSON response. */
    public record LoginResult(boolean success, boolean mfaRequired, String message,
                              String token, String challengeId, String demoOtp,
                              CurrentUser user) {

        static LoginResult failure(String message) {
            return new LoginResult(false, false, message, null, null, null, null);
        }

        static LoginResult success(String token, CurrentUser user) {
            return new LoginResult(true, false, "Login successful", token, null, null, user);
        }

        static LoginResult mfaRequired(String challengeId, String demoOtp) {
            return new LoginResult(false, true, "OTP required (Secure2u)", null, challengeId, demoOtp, null);
        }

        public Map<String, Object> toMap() {
            java.util.HashMap<String, Object> m = new java.util.HashMap<>();
            m.put("success", success);
            m.put("mfaRequired", mfaRequired);
            m.put("message", message);
            if (token != null) m.put("token", token);
            if (challengeId != null) m.put("challengeId", challengeId);
            if (demoOtp != null) m.put("demoOtp", demoOtp); // displayed on screen for the demo
            if (user != null) {
                m.put("user", Map.of(
                        "username", user.username(),
                        "displayName", user.displayName(),
                        "role", user.role().name()));
            }
            return m;
        }
    }
}
