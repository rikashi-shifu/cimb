package com.cimb.demo.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/** Security material and paths injected from the environment (see application.yml). */
@Component
@ConfigurationProperties(prefix = "app")
public class AppProperties {

    private final Encryption encryption = new Encryption();
    private final Payment payment = new Payment();
    private final Backup backup = new Backup();

    public Encryption getEncryption() { return encryption; }
    public Payment getPayment() { return payment; }
    public Backup getBackup() { return backup; }

    public static class Encryption {
        /** Base64-encoded 32-byte AES-256 key. */
        private String key;
        public String getKey() { return key; }
        public void setKey(String key) { this.key = key; }
    }

    public static class Payment {
        /** HMAC secret for signing/verifying payment instructions. */
        private String signingKey;
        public String getSigningKey() { return signingKey; }
        public void setSigningKey(String signingKey) { this.signingKey = signingKey; }
    }

    public static class Backup {
        /** Directory for the mock encrypted backup export. */
        private String dir = "./backups";
        public String getDir() { return dir; }
        public void setDir(String dir) { this.dir = dir; }
    }
}
