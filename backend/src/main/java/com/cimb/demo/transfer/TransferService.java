package com.cimb.demo.transfer;

import com.cimb.demo.account.Account;
import com.cimb.demo.account.AccountRepository;
import com.cimb.demo.audit.AuditService;
import com.cimb.demo.common.ApiException;
import com.cimb.demo.config.SecureModeState;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Module 3 — Duplicate transfer protection (CWE-675: Business Logic Errors,
 * SR5).
 *
 * Secure Mode OFF (vulnerable): every submit debits the source account, so
 * firing the same transfer twice debits it twice.
 *
 * Secure Mode ON (fixed): the request carries an idempotency key; a key already
 * used for a completed transfer is rejected (HTTP 409) and NO second debit
 * occurs. The first result stands.
 */
@Service
public class TransferService {

    private static final String COMPLETED = "COMPLETED";

    private final TransferRepository transfers;
    private final AccountRepository accounts;
    private final SecureModeState secureMode;
    private final AuditService audit;

    public TransferService(TransferRepository transfers, AccountRepository accounts,
            SecureModeState secureMode, AuditService audit) {
        this.transfers = transfers;
        this.accounts = accounts;
        this.secureMode = secureMode;
        this.audit = audit;
    }

    // synchronized so two rapid "double submit" requests are serialised for the duplicate check.
    @Transactional
    public synchronized Map<String, Object> transfer(String fromAccount, String toAccount,
            BigDecimal amount, String idempotencyKey) {
        if (amount == null || amount.signum() <= 0) {
            throw ApiException.badRequest("Amount must be greater than zero");
        }

        if (secureMode.isSecure()) {
            if (idempotencyKey == null || idempotencyKey.isBlank()) {
                throw ApiException.badRequest("Missing idempotency key (required in Secure Mode)");
            }
            // FIXED: reject a key already used by a completed transfer — do not debit again.
            var existing = transfers.findFirstByIdempotencyKeyAndStatus(idempotencyKey, COMPLETED);
            if (existing.isPresent()) {
                audit.record(fromAccount, "TRANSFER_DUPLICATE_BLOCKED",
                        "idempotencyKey=" + idempotencyKey + " amount=" + amount);
                throw ApiException.conflict(
                        "Duplicate transfer blocked: this idempotency key was already processed. "
                        + "The account was NOT debited again.");
            }
        }
        // Vulnerable path: idempotency key ignored — a repeat submit debits again.

        Account source = accounts.findByAccountNumber(fromAccount)
                .orElseThrow(() -> ApiException.badRequest("Unknown source account: " + fromAccount));
        if (source.getBalance().compareTo(amount) < 0) {
            throw ApiException.badRequest("Insufficient funds");
        }

        source.setBalance(source.getBalance().subtract(amount));
        accounts.save(source);
        accounts.findByAccountNumber(toAccount).ifPresent(dest -> {
            dest.setBalance(dest.getBalance().add(amount));
            accounts.save(dest);
        });

        Transfer t = new Transfer(UUID.randomUUID().toString(), Instant.now(), fromAccount, toAccount,
                amount, idempotencyKey, COMPLETED, secureMode.isSecure());
        transfers.save(t);
        audit.record(fromAccount, "TRANSFER_COMPLETED",
                "to=" + toAccount + " amount=" + amount + " secure=" + secureMode.isSecure()
                + " key=" + (idempotencyKey == null ? "none" : idempotencyKey));

        return Map.of(
                "status", COMPLETED,
                "transferId", t.getId(),
                "fromAccount", fromAccount,
                "toAccount", toAccount,
                "amount", amount,
                "newSourceBalance", source.getBalance(),
                "secureMode", secureMode.isSecure());
    }

    public List<Map<String, Object>> recent() {
        return transfers.findTop50ByOrderByCreatedAtDesc().stream().map(t -> Map.<String, Object>of(
                "id", t.getId(),
                "createdAt", t.getCreatedAt().toString(),
                "fromAccount", t.getFromAccount(),
                "toAccount", t.getToAccount(),
                "amount", t.getAmount(),
                "idempotencyKey", t.getIdempotencyKey() == null ? "" : t.getIdempotencyKey(),
                "status", t.getStatus(),
                "secureMode", t.isSecureMode())).toList();
    }
}
