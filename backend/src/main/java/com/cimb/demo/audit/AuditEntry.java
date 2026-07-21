package com.cimb.demo.audit;

import jakarta.persistence.*;

import java.time.Instant;

/**
 * One append-only audit record. Each row stores the hash of the previous row (prevHash)
 * and a hash over its own contents (entryHash), forming a tamper-evident chain (SR5):
 * altering any historical row breaks every hash that follows it.
 */
@Entity
@Table(name = "audit_log")
public class AuditEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ts", nullable = false)
    private Instant ts;

    @Column(name = "actor", nullable = false)
    private String actor;

    @Column(name = "action", nullable = false)
    private String action;

    @Column(name = "details", length = 2000)
    private String details;

    @Column(name = "prev_hash", nullable = false)
    private String prevHash;

    @Column(name = "entry_hash", nullable = false)
    private String entryHash;

    protected AuditEntry() {
    }

    public AuditEntry(Instant ts, String actor, String action, String details) {
        this.ts = ts;
        this.actor = actor;
        this.action = action;
        this.details = details;
    }

    public Long getId() { return id; }
    public Instant getTs() { return ts; }
    public String getActor() { return actor; }
    public String getAction() { return action; }
    public String getDetails() { return details; }
    public String getPrevHash() { return prevHash; }
    public void setPrevHash(String prevHash) { this.prevHash = prevHash; }
    public String getEntryHash() { return entryHash; }
    public void setEntryHash(String entryHash) { this.entryHash = entryHash; }
}
