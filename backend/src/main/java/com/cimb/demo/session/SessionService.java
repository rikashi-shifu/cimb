package com.cimb.demo.session;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Minimal in-memory session store. Real Spring Security is intentionally avoided so each
 * security module stays self-contained and explainable on its own during the demo.
 * A successful login mints an opaque token; protected endpoints resolve it back to the
 * {@link CurrentUser} and enforce role checks.
 */
@Service
public class SessionService {

    private final Map<String, CurrentUser> sessions = new ConcurrentHashMap<>();
    private final SecureRandom random = new SecureRandom();

    public String create(CurrentUser user) {
        byte[] raw = new byte[24];
        random.nextBytes(raw);
        String token = Base64.getUrlEncoder().withoutPadding().encodeToString(raw);
        sessions.put(token, user);
        return token;
    }

    /** Returns the user for a token, or null if the token is missing/unknown. */
    public CurrentUser resolve(String token) {
        if (token == null || token.isBlank()) {
            return null;
        }
        return sessions.get(token);
    }

    public void invalidate(String token) {
        if (token != null) {
            sessions.remove(token);
        }
    }

    /** Resolve a token, throwing 401 if absent/invalid. */
    public CurrentUser require(String token) {
        CurrentUser user = resolve(token);
        if (user == null) {
            throw new UnauthorizedException("Authentication required");
        }
        return user;
    }

    /** Resolve a token and require the ADMIN role, throwing 401/403 otherwise (SR7). */
    public CurrentUser requireAdmin(String token) {
        CurrentUser user = require(token);
        if (!user.isAdmin()) {
            throw new ForbiddenException(
                    "Access denied: this panel is restricted to the admin role (SR7). " +
                    "You are signed in as role " + user.role() + ".");
        }
        return user;
    }
}
