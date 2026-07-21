package com.cimb.demo.crypto;

import com.cimb.demo.config.AppProperties;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;

/**
 * AES-256-GCM authenticated encryption for data at rest (Module 4, CWE-311 / SR1, SR6).
 *
 * Ciphertext is stored as a self-describing string:
 *     enc:v1:BASE64(iv || ciphertext || gcmTag)
 *
 * The "enc:v1:" prefix lets the Raw Database View and callers tell at a glance whether a
 * stored value is encrypted, and lets decrypt() pass plaintext through unchanged when a
 * row was written while Secure Mode was OFF.
 */
@Component
public class AesGcmCipher {

    public static final String PREFIX = "enc:v1:";
    private static final int IV_LENGTH = 12;        // 96-bit nonce, recommended for GCM
    private static final int GCM_TAG_BITS = 128;

    private final AppProperties props;
    private final SecureRandom random = new SecureRandom();
    private SecretKeySpec keySpec;

    public AesGcmCipher(AppProperties props) {
        this.props = props;
    }

    @PostConstruct
    void init() {
        String b64 = props.getEncryption().getKey();
        if (b64 == null || b64.isBlank()) {
            throw new IllegalStateException(
                    "APP_ENCRYPTION_KEY is not set. Generate one with: openssl rand -base64 32");
        }
        byte[] key = Base64.getDecoder().decode(b64.trim());
        if (key.length != 32) {
            throw new IllegalStateException(
                    "APP_ENCRYPTION_KEY must decode to 32 bytes for AES-256 (got " + key.length + ").");
        }
        this.keySpec = new SecretKeySpec(key, "AES");
    }

    /** Encrypt a UTF-8 string, returning the "enc:v1:..." envelope. */
    public String encrypt(String plaintext) {
        if (plaintext == null) {
            return null;
        }
        try {
            byte[] iv = new byte[IV_LENGTH];
            random.nextBytes(iv);
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            cipher.init(Cipher.ENCRYPT_MODE, keySpec, new GCMParameterSpec(GCM_TAG_BITS, iv));
            byte[] ct = cipher.doFinal(plaintext.getBytes(StandardCharsets.UTF_8));

            byte[] out = new byte[iv.length + ct.length];
            System.arraycopy(iv, 0, out, 0, iv.length);
            System.arraycopy(ct, 0, out, iv.length, ct.length);
            return PREFIX + Base64.getEncoder().encodeToString(out);
        } catch (Exception e) {
            throw new IllegalStateException("Encryption failed", e);
        }
    }

    /** Decrypt an "enc:v1:..." envelope; values without the prefix are returned as-is. */
    public String decrypt(String stored) {
        if (stored == null || !stored.startsWith(PREFIX)) {
            return stored; // plaintext (written while Secure Mode was OFF) — pass through
        }
        try {
            byte[] blob = Base64.getDecoder().decode(stored.substring(PREFIX.length()));
            byte[] iv = new byte[IV_LENGTH];
            System.arraycopy(blob, 0, iv, 0, IV_LENGTH);
            byte[] ct = new byte[blob.length - IV_LENGTH];
            System.arraycopy(blob, IV_LENGTH, ct, 0, ct.length);

            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            cipher.init(Cipher.DECRYPT_MODE, keySpec, new GCMParameterSpec(GCM_TAG_BITS, iv));
            return new String(cipher.doFinal(ct), StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new IllegalStateException("Decryption failed (wrong key or corrupt data)", e);
        }
    }

    public boolean isEncrypted(String value) {
        return value != null && value.startsWith(PREFIX);
    }
}
