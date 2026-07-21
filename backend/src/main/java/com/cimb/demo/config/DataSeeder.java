package com.cimb.demo.config;

import com.cimb.demo.account.Account;
import com.cimb.demo.account.AccountRepository;
import com.cimb.demo.auth.User;
import com.cimb.demo.auth.UserRepository;
import com.cimb.demo.session.Role;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

/**
 * Seeds a few demo accounts on startup (idempotent). No registration flow exists by design;
 * these seeded accounts are all the demo needs.
 *
 * Demo credentials (also printed to the console on boot):
 *   customer  ->  harry / Password1!   (role CUSTOMER)
 *   admin     ->  admin / Admin123!    (role ADMIN)
 *
 * Sensitive account fields are seeded as PLAINTEXT so the Raw Database View starts on the
 * vulnerable state; flip Secure Mode ON and "Re-persist accounts" to see AES-256 ciphertext.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository users;
    private final AccountRepository accounts;
    private final BCryptPasswordEncoder encoder;

    // TOTP secrets are fixed base32 strings so the on-screen demo OTP is reproducible.
    private static final String HARRY_TOTP = "JBSWY3DPEHPK3PXP";
    private static final String ADMIN_TOTP = "KRSXG5CTMVRXEZLU";

    public DataSeeder(UserRepository users, AccountRepository accounts, BCryptPasswordEncoder encoder) {
        this.users = users;
        this.accounts = accounts;
        this.encoder = encoder;
    }

    @Override
    public void run(String... args) {
        if (users.count() == 0) {
            seedUser("harry", "Harry Liow Siang Yi", Role.CUSTOMER, "Password1!", HARRY_TOTP);
            seedUser("admin", "CIMB Admin", Role.ADMIN, "Admin123!", ADMIN_TOTP);
        }
        if (accounts.count() == 0) {
            accounts.save(new Account("acc-harry-1", "harry", "7074009478", "YOUTH SA STATEMENT",
                    new BigDecimal("7234.48"), "010203-14-5678", "4111111111111111", false));
            accounts.save(new Account("acc-harry-2", "harry", "7099887766", "BASIC SAVINGS",
                    new BigDecimal("1500.00"), "010203-14-5678", "5500005555555559", false));
            accounts.save(new Account("acc-siti-1", "siti", "8012345678", "SITI CURRENT ACCOUNT",
                    new BigDecimal("980.00"), "920511-08-1234", "4000123412341234", false));
        }

        System.out.println("""
                =====================================================================
                 CIMB Clicks Security Demo — seeded accounts
                   customer  ->  harry / Password1!   (role CUSTOMER)
                   admin     ->  admin / Admin123!    (role ADMIN)
                 Secure Mode starts OFF (vulnerable). Toggle it in the UI header.
                =====================================================================""");
    }

    private void seedUser(String username, String displayName, Role role, String password, String totp) {
        users.save(new User(username, displayName, role,
                encoder.encode(password), password.length(), totp));
    }
}
