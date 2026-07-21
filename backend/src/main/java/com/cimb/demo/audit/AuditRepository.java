package com.cimb.demo.audit;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AuditRepository extends JpaRepository<AuditEntry, Long> {

    Optional<AuditEntry> findTopByOrderByIdDesc();

    List<AuditEntry> findAllByOrderByIdAsc();

    List<AuditEntry> findTop100ByOrderByIdDesc();
}
