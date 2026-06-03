package com.farmersbuddy.farmers_buddy_backend.repository;

import com.farmersbuddy.farmers_buddy_backend.entity.MandiPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// =============================================================
// MandiPriceRepository.java — JPA Repository for MandiPrice Entity
// =============================================================
// Provides database access for the "mandi_prices" table.
// Spring Data JPA auto-generates the implementation at runtime.
// =============================================================

@Repository
public interface MandiPriceRepository extends JpaRepository<MandiPrice, Long> {
}
