package com.cimb.demo.account;

import com.cimb.demo.audit.AuditService;
import com.cimb.demo.config.AppProperties;
import com.cimb.demo.config.SecureModeState;
import com.cimb.demo.crypto.AesGcmCipher;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Instant;
import java.util.List;
import java.util.Map;

/**
 * Mock backup export to disk (Module 4 — SR6).
 *
 * Secure Mode OFF (vulnerable): the export is a plain-readable JSON file — anyone with the
 *   backup media reads every account in the clear.
 * Secure Mode ON (fixed): the export is a single AES-256 encrypted file; the preview shows
 *   ciphertext, and the file on disk cannot be read without the key.
 */
@Service
public class BackupService {

    private final AccountRepository accounts;
    private final AesGcmCipher cipher;
    private final SecureModeState secureMode;
    private final AppProperties props;
    private final AuditService audit;
    private final ObjectMapper mapper = new ObjectMapper();

    public BackupService(AccountRepository accounts, AesGcmCipher cipher, SecureModeState secureMode,
                         AppProperties props, AuditService audit) {
        this.accounts = accounts;
        this.cipher = cipher;
        this.secureMode = secureMode;
        this.props = props;
        this.audit = audit;
    }

    public BackupResult export() throws IOException {
        // Always back up the true plaintext data (decrypt at-rest values first).
        List<Map<String, Object>> data = accounts.findAllByOrderByAccountNumberAsc().stream()
                .map(a -> Map.<String, Object>of(
                        "accountNumber", a.getAccountNumber(),
                        "accountName", a.getAccountName(),
                        "owner", a.getOwnerUsername(),
                        "balance", a.getBalance(),
                        "nric", cipher.decrypt(a.getNric()),
                        "cardNumber", cipher.decrypt(a.getCardNumber())))
                .toList();

        String json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(data);

        Path dir = Path.of(props.getBackup().getDir());
        Files.createDirectories(dir);
        boolean secure = secureMode.isSecure();
        String stamp = String.valueOf(Instant.now().getEpochSecond());

        Path file;
        String fileContents;
        if (secure) {
            file = dir.resolve("backup-" + stamp + ".enc");
            fileContents = cipher.encrypt(json); // whole export encrypted
        } else {
            file = dir.resolve("backup-" + stamp + ".json");
            fileContents = json; // plain readable
        }
        Files.writeString(file, fileContents, StandardCharsets.UTF_8);

        audit.record("system", "BACKUP_EXPORTED",
                (secure ? "AES-256 encrypted" : "PLAINTEXT") + " -> " + file.getFileName());

        String preview = fileContents.length() > 600 ? fileContents.substring(0, 600) + " ..." : fileContents;
        return new BackupResult(file.toAbsolutePath().toString(), secure, preview);
    }

    public record BackupResult(String path, boolean encrypted, String preview) {
    }
}
