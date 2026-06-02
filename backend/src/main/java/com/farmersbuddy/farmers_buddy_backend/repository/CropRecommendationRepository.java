package com.farmersbuddy.farmers_buddy_backend.repository;

import com.farmersbuddy.farmers_buddy_backend.entity.CropRecommendation;

import org.springframework.data.jpa.repository.JpaRepository;

// =============================================================
// CropRecommendationRepository.java — Data Access for CropRecommendation
// =============================================================
// Extends JpaRepository to provide standard CRUD operations
// for the CropRecommendation entity (crop_recommendations table).
//
// No custom query methods needed — standard JpaRepository methods
// (save, findAll) are sufficient for this feature.
//
// Used by: CropRecommendationController (directly, without a service layer)
// =============================================================

public interface CropRecommendationRepository
        extends JpaRepository<CropRecommendation, Long> {
}
