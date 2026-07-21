package com.cimb.demo.crypto;

import com.cimb.demo.config.AppProperties;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

/** Module 4 — AES-256-GCM encryption at rest (CWE-311). */
class AesGcmCipherTest {

    private AesGcmCipher cipher;

    @BeforeEach
    void setUp() {
        AppProperties props = new AppProperties();
        // Valid base64 32-byte AES-256 key.
        props.getEncryption().setKey("DA3fCK0JE1V0OTVFWaknpKm3N3zM8nlkWQ5wc8w5y7o=");
        cipher = new AesGcmCipher(props);
        cipher.init();
    }

    @Test
    void encryptThenDecrypt_roundTrips() {
        String plain = "010203-14-5678";
        String enc = cipher.encrypt(plain);

        assertThat(enc).startsWith(AesGcmCipher.PREFIX);
        assertThat(enc).doesNotContain(plain);          // ciphertext is not readable
        assertThat(cipher.decrypt(enc)).isEqualTo(plain);
        assertThat(cipher.isEncrypted(enc)).isTrue();
    }

    @Test
    void encrypt_usesFreshIv_soCiphertextDiffersEachTime() {
        String a = cipher.encrypt("same-value");
        String b = cipher.encrypt("same-value");
        assertThat(a).isNotEqualTo(b);                   // random IV per encryption
        assertThat(cipher.decrypt(a)).isEqualTo(cipher.decrypt(b));
    }

    @Test
    void decrypt_passesThroughPlaintext_whenNotEncrypted() {
        // Values written while Secure Mode was OFF have no prefix and must pass through.
        assertThat(cipher.decrypt("4111111111111111")).isEqualTo("4111111111111111");
        assertThat(cipher.isEncrypted("4111111111111111")).isFalse();
    }

    @Test
    void rejectsWrongKeyLength() {
        AppProperties bad = new AppProperties();
        bad.getEncryption().setKey("c2hvcnQ="); // "short" -> 5 bytes, not 32
        AesGcmCipher badCipher = new AesGcmCipher(bad);
        assertThatThrownBy(badCipher::init)
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("32 bytes");
    }
}
