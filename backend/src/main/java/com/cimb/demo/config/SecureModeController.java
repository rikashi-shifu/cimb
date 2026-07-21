package com.cimb.demo.config;

import com.cimb.demo.audit.AuditService;
import com.cimb.demo.session.CurrentUser;
import com.cimb.demo.session.SessionService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Exposes the global Secure Mode toggle to the UI. Always visible so the active state
 * is unmistakable during a demo.
 */
@RestController
@RequestMapping("/api/secure-mode")
@CrossOrigin(origins = "*")
public class SecureModeController {

    private final SecureModeState state;
    private final AuditService audit;
    private final SessionService sessions;

    public SecureModeController(SecureModeState state, AuditService audit, SessionService sessions) {
        this.state = state;
        this.audit = audit;
        this.sessions = sessions;
    }

    @GetMapping
    public Map<String, Object> get() {
        return Map.of("secure", state.isSecure());
    }

    @PostMapping
    public Map<String, Object> set(@RequestBody Map<String, Object> body,
                                   @RequestHeader(value = "X-Session-Token", required = false) String token) {
        boolean value = Boolean.parseBoolean(String.valueOf(body.getOrDefault("secure", false)));
        state.setSecure(value);
        CurrentUser user = sessions.resolve(token);
        audit.record(user == null ? "anonymous" : user.username(),
                "SECURE_MODE_CHANGED", "secure=" + value);
        return Map.of("secure", state.isSecure());
    }
}
