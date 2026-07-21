package com.cimb.demo.audit;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HexFormat;
import java.util.List;

/**
 * Append-only audit trail with a SHA-256 hash chain (SR5).
 *
 * Every login, transfer and payment records an entry. Each entry's hash covers its own
 * fields plus the previous entry's hash, so any later tampering with a historical row is
 * detectable by {@link #verifyChain()}.
 */
@Service
public class AuditService {

    private static final String GENESIS = "0".repeat(64);

    private final AuditRepository repo;

    public AuditService(AuditRepository repo) {
        this.repo = repo;
    }

    /** Append a new audit entry, linking it to the current chain head. */
    @Transactional
    public synchronized AuditEntry record(String actor, String action, String details) {
        String prevHash = repo.findTopByOrderByIdDesc()
                .map(AuditEntry::getEntryHash)
                .orElse(GENESIS);

        // Truncate to milliseconds so the timestamp survives the DB round-trip unchanged and the
        // hash still verifies after re-reading (Postgres/H2 do not preserve nanosecond precision).
        AuditEntry entry = new AuditEntry(Instant.now().truncatedTo(ChronoUnit.MILLIS),
                actor, action, details);
        entry.setPrevHash(prevHash);
        entry.setEntryHash(computeHash(entry));
        return repo.saveAndFlush(entry);
    }

    // The hash intentionally excludes the DB-generated id: it is set before the row is saved, and
    // chain ordering is enforced separately by iterating rows in id order.
    private String computeHash(AuditEntry e) {
        String payload = String.join("|",
                e.getTs().toString(),
                e.getActor(),
                e.getAction(),
                e.getDetails() == null ? "" : e.getDetails(),
                e.getPrevHash());
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            return HexFormat.of().formatHex(md.digest(payload.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception ex) {
            throw new IllegalStateException("Hashing failed", ex);
        }
    }

    public List<AuditEntry> recent() {
        return repo.findTop100ByOrderByIdDesc();
    }

    /**
     * Recompute the chain from the genesis hash and report the first broken link, if any.
     * Used by the UI to prove the log is tamper-evident.
     */
    @Transactional(readOnly = true)
    public VerificationResult verifyChain() {
        List<AuditEntry> all = repo.findAllByOrderByIdAsc();
        String expectedPrev = GENESIS;
        List<Long> broken = new ArrayList<>();
        for (AuditEntry e : all) {
            boolean linkOk = expectedPrev.equals(e.getPrevHash());
            boolean selfOk = computeHash(e).equals(e.getEntryHash());
            if (!linkOk || !selfOk) {
                broken.add(e.getId());
            }
            expectedPrev = e.getEntryHash();
        }
        return new VerificationResult(broken.isEmpty(), all.size(), broken);
    }

    public record VerificationResult(boolean valid, int entries, List<Long> brokenEntryIds) {
    }
}
