package com.cimb.demo.payment;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.Instant;

/** A recorded card payment attempt (Module 2). */
@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "merchant", nullable = false)
    private String merchant;

    @Column(name = "amount", nullable = false, precision = 18, scale = 2)
    private BigDecimal amount;

    @Column(name = "card_last4", nullable = false)
    private String cardLast4;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "secure_mode", nullable = false)
    private boolean secureMode;

    @Column(name = "note", length = 500)
    private String note;

    protected Payment() {
    }

    public Payment(String id, Instant createdAt, String merchant, BigDecimal amount,
                   String cardLast4, String status, boolean secureMode, String note) {
        this.id = id;
        this.createdAt = createdAt;
        this.merchant = merchant;
        this.amount = amount;
        this.cardLast4 = cardLast4;
        this.status = status;
        this.secureMode = secureMode;
        this.note = note;
    }

    public String getId() { return id; }
    public Instant getCreatedAt() { return createdAt; }
    public String getMerchant() { return merchant; }
    public BigDecimal getAmount() { return amount; }
    public String getCardLast4() { return cardLast4; }
    public String getStatus() { return status; }
    public boolean isSecureMode() { return secureMode; }
    public String getNote() { return note; }
}
