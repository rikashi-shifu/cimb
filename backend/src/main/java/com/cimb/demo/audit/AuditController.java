package com.cimb.demo.audit;

import com.cimb.demo.session.SessionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Live audit-log panel (SR5). Reading the log is ADMIN-only (SR7): a customer session is
 * denied with 403 so the demo can show role-based access control in action.
 */
@RestController
@RequestMapping("/api/audit")
@CrossOrigin(origins = "*")
public class AuditController {

    private final AuditService audit;
    private final SessionService sessions;

    public AuditController(AuditService audit, SessionService sessions) {
        this.audit = audit;
        this.sessions = sessions;
    }

    @GetMapping
    public Map<String, Object> list(@RequestHeader(value = "X-Session-Token", required = false) String token) {
        sessions.requireAdmin(token); // SR7 — restricted to admin
        List<Map<String, Object>> entries = audit.recent().stream().map(e -> Map.of(
                "id", (Object) e.getId(),
                "ts", e.getTs().toString(),
                "actor", e.getActor(),
                "action", e.getAction(),
                "details", e.getDetails() == null ? "" : e.getDetails(),
                "prevHash", e.getPrevHash(),
                "entryHash", e.getEntryHash()
        )).toList();
        return Map.of("entries", entries);
    }

    @GetMapping("/verify")
    public AuditService.VerificationResult verify(
            @RequestHeader(value = "X-Session-Token", required = false) String token) {
        sessions.requireAdmin(token);
        return audit.verifyChain();
    }
}
