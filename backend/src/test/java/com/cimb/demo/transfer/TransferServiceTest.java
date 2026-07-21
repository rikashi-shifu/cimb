package com.cimb.demo.transfer;

import com.cimb.demo.account.Account;
import com.cimb.demo.account.AccountRepository;
import com.cimb.demo.audit.AuditService;
import com.cimb.demo.common.ApiException;
import com.cimb.demo.config.SecureModeState;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

/** Module 3 — duplicate transfer protection (CWE-840). */
@ExtendWith(MockitoExtension.class)
class TransferServiceTest {

    @Mock TransferRepository transfers;
    @Mock AccountRepository accounts;
    @Mock AuditService audit;

    private Account source;

    @BeforeEach
    void setUp() {
        source = new Account("acc-1", "harry", "7074009478", "YOUTH SA",
                new BigDecimal("1000.00"), "010203-14-5678", "4111111111111111", false);
    }

    @Test
    void vulnerableMode_firingTwice_debitsTwice() {
        SecureModeState mode = new SecureModeState(); // OFF by default
        TransferService svc = new TransferService(transfers, accounts, mode, audit);
        when(accounts.findByAccountNumber("7074009478")).thenReturn(Optional.of(source));
        when(accounts.findByAccountNumber("8012345678")).thenReturn(Optional.empty());

        svc.transfer("7074009478", "8012345678", new BigDecimal("100.00"), "same-key");
        svc.transfer("7074009478", "8012345678", new BigDecimal("100.00"), "same-key");

        // The vulnerable path ignores the idempotency key: 1000 - 100 - 100 = 800.
        assertThat(source.getBalance()).isEqualByComparingTo("800.00");
        verify(transfers, times(2)).save(any());
    }

    @Test
    void secureMode_duplicateKey_isBlockedAndNotDebited() {
        SecureModeState mode = new SecureModeState();
        mode.setSecure(true);
        TransferService svc = new TransferService(transfers, accounts, mode, audit);

        Transfer already = new Transfer("t-1", java.time.Instant.now(), "7074009478",
                "8012345678", new BigDecimal("100.00"), "same-key", "COMPLETED", true);
        when(transfers.findFirstByIdempotencyKeyAndStatus("same-key", "COMPLETED"))
                .thenReturn(Optional.of(already));

        assertThatThrownBy(() ->
                svc.transfer("7074009478", "8012345678", new BigDecimal("100.00"), "same-key"))
                .isInstanceOf(ApiException.class)
                .hasMessageContaining("Duplicate transfer blocked");

        // No debit, no new transfer row.
        verify(accounts, never()).save(any());
        verify(transfers, never()).save(any());
        assertThat(source.getBalance()).isEqualByComparingTo("1000.00");
    }

    @Test
    void secureMode_firstTransferWithKey_succeeds() {
        SecureModeState mode = new SecureModeState();
        mode.setSecure(true);
        TransferService svc = new TransferService(transfers, accounts, mode, audit);

        when(transfers.findFirstByIdempotencyKeyAndStatus(eq("fresh-key"), eq("COMPLETED")))
                .thenReturn(Optional.empty());
        when(accounts.findByAccountNumber("7074009478")).thenReturn(Optional.of(source));
        when(accounts.findByAccountNumber("8012345678")).thenReturn(Optional.empty());

        svc.transfer("7074009478", "8012345678", new BigDecimal("100.00"), "fresh-key");

        assertThat(source.getBalance()).isEqualByComparingTo("900.00");
        verify(transfers, times(1)).save(any());
    }

    @Test
    void secureMode_missingIdempotencyKey_isRejected() {
        SecureModeState mode = new SecureModeState();
        mode.setSecure(true);
        TransferService svc = new TransferService(transfers, accounts, mode, audit);

        assertThatThrownBy(() ->
                svc.transfer("7074009478", "8012345678", new BigDecimal("100.00"), null))
                .isInstanceOf(ApiException.class)
                .hasMessageContaining("idempotency key");
    }
}
