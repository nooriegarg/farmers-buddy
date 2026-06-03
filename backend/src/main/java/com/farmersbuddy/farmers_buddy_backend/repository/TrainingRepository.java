package com.farmersbuddy.farmers_buddy_backend.repository;

import com.farmersbuddy.farmers_buddy_backend.entity.Training;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// =============================================================
// TrainingRepository.java — JPA Repository for Training Entity
// =============================================================
// Provides database access for the "trainings" table.
// Spring Data JPA auto-generates the implementation at runtime.
// =============================================================

@Repository
public interface TrainingRepository extends JpaRepository<Training, Long> {
}
