package com.cimb.demo.transfer;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.Instant;

/** A completed (or rejected) fund transfer (Module 3). */
@Entity
@Table(name = "transfers")
public class Transfer {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "from_account", nullable = false)
    private String fromAccount;

    @Column(name = "to_account", nullable = false)
    private String toAccount;

    @Column(name = "amount", nullable = false, precision = 18, scale = 2)
    private BigDecimal amount;

    // Present when the client supplied one. In Secure Mode the service rejects a key already
    // used by a completed transfer. NOT a DB unique constraint — the vulnerable path must be
    // able to insert the same key twice to demonstrate the double debit.
    @Column(name = "idempotency_key")
    private String idempotencyKey;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "secure_mode", nullable = false)
    private boolean secureMode;

    protected Transfer() {
    }

    public Transfer(String id, Instant createdAt, String fromAccount, String toAccount,
                    BigDecimal amount, String idempotencyKey, String status, boolean secureMode) {
        this.id = id;
        this.createdAt = createdAt;
        this.fromAccount = fromAccount;
        this.toAccount = toAccount;
        this.amount = amount;
        this.idempotencyKey = idempotencyKey;
        this.status = status;
        this.secureMode = secureMode;
    }

    public String getId() { return id; }
    public Instant getCreatedAt() { return createdAt; }
    public String getFromAccount() { return fromAccount; }
    public String getToAccount() { return toAccount; }
    public BigDecimal getAmount() { return amount; }
    public String getIdempotencyKey() { return idempotencyKey; }
    public String getStatus() { return status; }
    public boolean isSecureMode() { return secureMode; }
}
