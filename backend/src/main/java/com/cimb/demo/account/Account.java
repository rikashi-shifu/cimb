package com.cimb.demo.account;

import jakarta.persistence.*;

import java.math.BigDecimal;

/**
 * A bank account record (Module 4 — Encryption at rest, CWE-311 / SR1, SR6).
 *
 * {@code nric} and {@code cardNumber} are the sensitive fields. They hold either plaintext
 * (Secure Mode OFF) or an "enc:v1:..." AES-256 envelope (Secure Mode ON); {@code secureStored}
 * records which. {@code accountNumber}, {@code accountName} and {@code balance} stay in the
 * clear because the app logic needs them and they are not the point of this demo.
 */
@Entity
@Table(name = "accounts")
public class Account {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "owner_username", nullable = false)
    private String ownerUsername;

    @Column(name = "account_number", nullable = false)
    private String accountNumber;

    @Column(name = "account_name", nullable = false)
    private String accountName;

    @Column(name = "balance", nullable = false, precision = 18, scale = 2)
    private BigDecimal balance;

    // Sensitive — plaintext or AES-256 ciphertext depending on how it was last written.
    @Column(name = "nric", nullable = false, length = 512)
    private String nric;

    @Column(name = "card_number", nullable = false, length = 512)
    private String cardNumber;

    @Column(name = "secure_stored", nullable = false)
    private boolean secureStored;

    protected Account() {
    }

    public Account(String id, String ownerUsername, String accountNumber, String accountName,
                   BigDecimal balance, String nric, String cardNumber, boolean secureStored) {
        this.id = id;
        this.ownerUsername = ownerUsername;
        this.accountNumber = accountNumber;
        this.accountName = accountName;
        this.balance = balance;
        this.nric = nric;
        this.cardNumber = cardNumber;
        this.secureStored = secureStored;
    }

    public String getId() { return id; }
    public String getOwnerUsername() { return ownerUsername; }
    public String getAccountNumber() { return accountNumber; }
    public String getAccountName() { return accountName; }
    public BigDecimal getBalance() { return balance; }
    public void setBalance(BigDecimal balance) { this.balance = balance; }
    public String getNric() { return nric; }
    public void setNric(String nric) { this.nric = nric; }
    public String getCardNumber() { return cardNumber; }
    public void setCardNumber(String cardNumber) { this.cardNumber = cardNumber; }
    public boolean isSecureStored() { return secureStored; }
    public void setSecureStored(boolean secureStored) { this.secureStored = secureStored; }
}
