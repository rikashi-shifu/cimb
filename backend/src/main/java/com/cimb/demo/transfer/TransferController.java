package com.cimb.demo.transfer;

import com.cimb.demo.session.SessionService;
import jakarta.validation.constraints.NotBlank;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

/**
 * Module 3 — Fund transfer endpoints (CWE-840 / SR5).
 */
@RestController
@RequestMapping("/api/transfers")
@CrossOrigin(origins = "*")
public class TransferController {

    private final TransferService service;
    private final SessionService sessions;

    public TransferController(TransferService service, SessionService sessions) {
        this.service = service;
        this.sessions = sessions;
    }

    @PostMapping
    public Map<String, Object> transfer(@RequestHeader(value = "X-Session-Token", required = false) String token,
                                        @RequestBody TransferRequest req) {
        sessions.require(token);
        return service.transfer(req.fromAccount(), req.toAccount(), req.amount(), req.idempotencyKey());
    }

    @GetMapping
    public Map<String, Object> list(@RequestHeader(value = "X-Session-Token", required = false) String token) {
        sessions.require(token);
        return Map.of("transfers", service.recent());
    }

    public record TransferRequest(@NotBlank String fromAccount, @NotBlank String toAccount,
                                  BigDecimal amount, String idempotencyKey) {
    }
}
