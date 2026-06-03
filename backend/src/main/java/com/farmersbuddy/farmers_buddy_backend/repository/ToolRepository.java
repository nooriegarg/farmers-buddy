package com.farmersbuddy.farmers_buddy_backend.repository;

import com.farmersbuddy.farmers_buddy_backend.entity.Tool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// =============================================================
// ToolRepository.java — JPA Repository for Tool Entity
// =============================================================
// Provides database access for the "tools" table.
// Spring Data JPA auto-generates the implementation at runtime.
// =============================================================

@Repository
public interface ToolRepository extends JpaRepository<Tool, Long> {
}
