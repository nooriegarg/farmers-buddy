package com.farmersbuddy.farmers_buddy_backend.repository;

import com.farmersbuddy.farmers_buddy_backend.entity.TrainingEnrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// =============================================================
// TrainingEnrollmentRepository.java — JPA Repository for TrainingEnrollment
// =============================================================
// Provides DB access for "training_enrollments" table.
// Custom derived query methods allow filtering by farmerId or trainingId.
// Spring Data JPA auto-implements these based on method name conventions.
// =============================================================

@Repository
public interface TrainingEnrollmentRepository extends JpaRepository<TrainingEnrollment, Long> {

    // Returns all enrollments made by a specific farmer
    List<TrainingEnrollment> findByFarmerId(Long farmerId);

    // Returns all farmers who enrolled in a specific training
    List<TrainingEnrollment> findByTrainingId(Long trainingId);
}
