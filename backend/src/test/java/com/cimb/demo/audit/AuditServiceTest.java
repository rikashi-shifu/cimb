package com.cimb.demo.audit;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

import static org.assertj.core.api.Assertions.assertThat;

/** Shared — append-only hash-chained audit log (SR5). */
@DataJpaTest
@Import(AuditService.class)
class AuditServiceTest {

    @Autowired AuditService audit;
    @Autowired AuditRepository repo;
    @Autowired TestEntityManager em;

    @Test
    void chainIsValid_afterAppendingEntries() {
        audit.record("harry", "LOGIN_SUCCESS", "no MFA");
        audit.record("harry", "TRANSFER_COMPLETED", "amount=100");
        audit.record("admin", "SECURE_MODE_CHANGED", "secure=true");

        AuditService.VerificationResult result = audit.verifyChain();
        assertThat(result.valid()).isTrue();
        assertThat(result.entries()).isEqualTo(3);
        assertThat(result.brokenEntryIds()).isEmpty();
    }

    @Test
    void tamperingWithAHistoricalRow_breaksTheChain() {
        audit.record("harry", "LOGIN_SUCCESS", "no MFA");
        AuditEntry second = audit.record("harry", "TRANSFER_COMPLETED", "amount=100");
        audit.record("harry", "PAYMENT_COMPLETED", "amount=250");

        // Tamper directly in storage, bypassing the service (as an attacker would).
        em.getEntityManager()
                .createNativeQuery("update audit_log set details = 'amount=1' where id = :id")
                .setParameter("id", second.getId())
                .executeUpdate();
        em.flush();
        em.clear();

        AuditService.VerificationResult result = audit.verifyChain();
        assertThat(result.valid()).isFalse();
        assertThat(result.brokenEntryIds()).contains(second.getId());
    }
}
