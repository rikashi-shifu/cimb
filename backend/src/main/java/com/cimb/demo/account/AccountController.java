package com.cimb.demo.account;

import com.cimb.demo.config.SecureModeState;
import com.cimb.demo.session.SessionService;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * Module 4 endpoints — Encryption at rest (CWE-311 / SR1, SR6) plus the Raw Database View.
 * The Raw Database View and the backup export are ADMIN-only (SR7).
 */
@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "*")
public class AccountController {

    private final AccountService service;
    private final BackupService backup;
    private final SessionService sessions;
    private final SecureModeState secureMode;

    public AccountController(AccountService service, BackupService backup,
                            SessionService sessions, SecureModeState secureMode) {
        this.service = service;
        this.backup = backup;
        this.sessions = sessions;
        this.secureMode = secureMode;
    }

    /** Application view (owner-facing), any authenticated user. */
    @GetMapping
    public Map<String, Object> list(@RequestHeader(value = "X-Session-Token", required = false) String token) {
        sessions.require(token);
        return Map.of("accounts", service.applicationView());
    }

    /** Raw Database View — reads straight from storage. ADMIN only (SR7). */
    @GetMapping("/raw")
    public Map<String, Object> raw(@RequestHeader(value = "X-Session-Token", required = false) String token) {
        sessions.requireAdmin(token);
        List<Map<String, Object>> rows = service.rawStorageView();
        return Map.of(
                "secureMode", secureMode.isSecure(),
                "rows", rows);
    }

    /** Rewrite stored sensitive fields to match current Secure Mode. ADMIN only. */
    @PostMapping("/repersist")
    public Map<String, Object> repersist(@RequestHeader(value = "X-Session-Token", required = false) String token) {
        sessions.requireAdmin(token);
        int n = service.repersistAll();
        return Map.of(
                "updated", n,
                "secureMode", secureMode.isSecure(),
                "message", secureMode.isSecure()
                        ? "Sensitive fields re-stored as AES-256 ciphertext."
                        : "Sensitive fields re-stored as PLAINTEXT (vulnerable).");
    }

    /** Export the mock backup file to disk. ADMIN only (SR6). */
    @PostMapping("/backup")
    public BackupService.BackupResult backup(
            @RequestHeader(value = "X-Session-Token", required = false) String token) throws IOException {
        sessions.requireAdmin(token);
        return backup.export();
    }
}
