package com.cimb.demo.transfer;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TransferRepository extends JpaRepository<Transfer, String> {

    Optional<Transfer> findFirstByIdempotencyKeyAndStatus(String idempotencyKey, String status);

    List<Transfer> findTop50ByOrderByCreatedAtDesc();
}
