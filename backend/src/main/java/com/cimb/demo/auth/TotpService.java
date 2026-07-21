package com.cimb.demo.auth;

import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.ByteBuffer;
import java.time.Instant;

/**
 * Time-based one-time password (RFC 6238), simulating CIMB's Secure2u second factor.
 * SHA-1, 30-second step, 6 digits. Implemented directly (no external library) so the
 * module stays self-contained and explainable during the demo.
 *
 * For the demo the current code is shown on screen instead of being pushed/SMSed.
 */
@Service
public class TotpService {

    private static final int DIGITS = 6;
    private static final int STEP_SECONDS = 30;
    private static final int MOD = 1_000_000; // 10^DIGITS

    /** Current 6-digit code for a base32 secret. */
    public String currentCode(String base32Secret) {
        return codeAt(base32Secret, Instant.now().getEpochSecond() / STEP_SECONDS);
    }

    /**
     * Verify a submitted code, tolerating +/- 1 time step for clock skew and demo timing.
     */
    public boolean verify(String base32Secret, String submitted) {
        if (submitted == null) {
            return false;
        }
        String clean = submitted.trim();
        long counter = Instant.now().getEpochSecond() / STEP_SECONDS;
        for (long c = counter - 1; c <= counter + 1; c++) {
            if (constantTimeEquals(codeAt(base32Secret, c), clean)) {
                return true;
            }
        }
        return false;
    }

    private String codeAt(String base32Secret, long counter) {
        try {
            byte[] key = Base32.decode(base32Secret);
            byte[] msg = ByteBuffer.allocate(8).putLong(counter).array();
            Mac mac = Mac.getInstance("HmacSHA1");
            mac.init(new SecretKeySpec(key, "HmacSHA1"));
            byte[] hash = mac.doFinal(msg);

            int offset = hash[hash.length - 1] & 0x0F;
            int binary = ((hash[offset] & 0x7F) << 24)
                    | ((hash[offset + 1] & 0xFF) << 16)
                    | ((hash[offset + 2] & 0xFF) << 8)
                    | (hash[offset + 3] & 0xFF);
            int otp = binary % MOD;
            return String.format("%0" + DIGITS + "d", otp);
        } catch (Exception e) {
            throw new IllegalStateException("TOTP generation failed", e);
        }
    }

    private boolean constantTimeEquals(String a, String b) {
        if (a.length() != b.length()) {
            return false;
        }
        int result = 0;
        for (int i = 0; i < a.length(); i++) {
            result |= a.charAt(i) ^ b.charAt(i);
        }
        return result == 0;
    }

    /** Minimal RFC 4648 base32 decoder (upper-case, no padding required). */
    static final class Base32 {
        private static final String ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

        static byte[] decode(String s) {
            String clean = s.replace("=", "").replace(" ", "").toUpperCase();
            int bits = 0, value = 0, index = 0;
            byte[] out = new byte[clean.length() * 5 / 8];
            for (int i = 0; i < clean.length(); i++) {
                int c = ALPHABET.indexOf(clean.charAt(i));
                if (c < 0) {
                    throw new IllegalArgumentException("Invalid base32 char: " + clean.charAt(i));
                }
                value = (value << 5) | c;
                bits += 5;
                if (bits >= 8) {
                    out[index++] = (byte) ((value >>> (bits - 8)) & 0xFF);
                    bits -= 8;
                }
            }
            return out;
        }
    }
}
