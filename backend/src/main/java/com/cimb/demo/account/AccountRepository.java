package com.cimb.demo.account;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, String> {
    List<Account> findAllByOrderByAccountNumberAsc();
    Optional<Account> findByAccountNumber(String accountNumber);
    Optional<Account> findFirstByOwnerUsername(String ownerUsername);
}
