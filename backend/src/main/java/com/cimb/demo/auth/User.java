package com.cimb.demo.auth;

import com.cimb.demo.session.Role;
import jakarta.persistence.*;

/**
 * A demo user. {@code passwordLength} stores the length of the original plaintext password
 * and exists ONLY to reproduce the CWE-303 truncation bug in Module 1: the vulnerable login
 * path compares only the first {@code passwordLength} characters of what the user submits.
 */
@Entity
@Table(name = "users")
public class User {

    @Id
    @Column(name = "username")
    private String username;

    @Column(name = "display_name", nullable = false)
    private String displayName;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "password_length", nullable = false)
    private int passwordLength;

    @Column(name = "totp_secret", nullable = false)
    private String totpSecret;

    protected User() {
    }

    public User(String username, String displayName, Role role,
                String passwordHash, int passwordLength, String totpSecret) {
        this.username = username;
        this.displayName = displayName;
        this.role = role;
        this.passwordHash = passwordHash;
        this.passwordLength = passwordLength;
        this.totpSecret = totpSecret;
    }

    public String getUsername() { return username; }
    public String getDisplayName() { return displayName; }
    public Role getRole() { return role; }
    public String getPasswordHash() { return passwordHash; }
    public int getPasswordLength() { return passwordLength; }
    public String getTotpSecret() { return totpSecret; }
}
