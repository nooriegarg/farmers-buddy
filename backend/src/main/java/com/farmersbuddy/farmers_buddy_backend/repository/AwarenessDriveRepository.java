package com.farmersbuddy.farmers_buddy_backend.repository;

import com.farmersbuddy.farmers_buddy_backend.entity.AwarenessDrive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// =============================================================
// AwarenessDriveRepository.java — JPA Repository for AwarenessDrive
// =============================================================
// Provides database access for the "awareness_drives" table.
// Spring Data JPA auto-generates the implementation at runtime.
// =============================================================

@Repository
public interface AwarenessDriveRepository extends JpaRepository<AwarenessDrive, Long> {
}
