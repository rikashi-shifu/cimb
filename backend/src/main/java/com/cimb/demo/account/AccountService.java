package com.cimb.demo.account;

import com.cimb.demo.audit.AuditService;
import com.cimb.demo.config.SecureModeState;
import com.cimb.demo.crypto.AesGcmCipher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * Module 4 — Encryption at rest (CWE-311 / SR1, SR6).
 *
 * Secure Mode OFF (vulnerable): sensitive fields (NRIC, card number) are persisted in plain,
 *   readable form. The Raw Database View shows them in the clear.
 *
 * Secure Mode ON (fixed): the same fields are AES-256-GCM encrypted before storage, so the
 *   Raw Database View shows ciphertext. The application view decrypts on read.
 *
 * "Re-persist accounts" rewrites every account's sensitive fields to match the CURRENT Secure
 * Mode, so a grader can flip the toggle and watch storage change from plaintext to ciphertext.
 */
@Service
public class AccountService {

    private final AccountRepository repo;
    private final AesGcmCipher cipher;
    private final SecureModeState secureMode;
    private final AuditService audit;

    public AccountService(AccountRepository repo, AesGcmCipher cipher,
                          SecureModeState secureMode, AuditService audit) {
        this.repo = repo;
        this.cipher = cipher;
        this.secureMode = secureMode;
        this.audit = audit;
    }

    /** Application view: sensitive fields decrypted for display to the owner. */
    @Transactional(readOnly = true)
    public List<Map<String, Object>> applicationView() {
        return repo.findAllByOrderByAccountNumberAsc().stream().map(a -> Map.<String, Object>of(
                "id", a.getId(),
                "owner", a.getOwnerUsername(),
                "accountNumber", a.getAccountNumber(),
                "accountName", a.getAccountName(),
                "balance", a.getBalance(),
                "nric", cipher.decrypt(a.getNric()),
                "cardNumber", cipher.decrypt(a.getCardNumber())
        )).toList();
    }

    /**
     * Raw Database View: the exact bytes on disk, no decryption. Plaintext when a row was
     * written in vulnerable mode, "enc:v1:..." ciphertext when written in secure mode.
     */
    @Transactional(readOnly = true)
    public List<Map<String, Object>> rawStorageView() {
        return repo.findAllByOrderByAccountNumberAsc().stream().map(a -> Map.<String, Object>of(
                "id", a.getId(),
                "owner", a.getOwnerUsername(),
                "accountNumber", a.getAccountNumber(),
                "accountName", a.getAccountName(),
                "balance", a.getBalance(),
                "nric", a.getNric(),
                "cardNumber", a.getCardNumber(),
                "encrypted", a.isSecureStored()
        )).toList();
    }

    /**
     * Rewrite all accounts' sensitive fields according to the current Secure Mode. Encrypts
     * when ON, decrypts back to plaintext when OFF. Idempotent for a given mode.
     */
    @Transactional
    public int repersistAll() {
        boolean secure = secureMode.isSecure();
        List<Account> accounts = repo.findAll();
        for (Account a : accounts) {
            // Normalise to plaintext first (decrypt is a pass-through for already-plaintext values).
            String nricPlain = cipher.decrypt(a.getNric());
            String cardPlain = cipher.decrypt(a.getCardNumber());
            if (secure) {
                a.setNric(cipher.encrypt(nricPlain));
                a.setCardNumber(cipher.encrypt(cardPlain));
                a.setSecureStored(true);
            } else {
                a.setNric(nricPlain);
                a.setCardNumber(cardPlain);
                a.setSecureStored(false);
            }
        }
        repo.saveAll(accounts);
        audit.record("system", "ACCOUNTS_REPERSISTED",
                (secure ? "AES-256 encrypted" : "PLAINTEXT") + " x" + accounts.size());
        return accounts.size();
    }
}
