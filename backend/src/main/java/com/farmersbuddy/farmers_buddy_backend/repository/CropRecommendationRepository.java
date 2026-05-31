package com.farmersbuddy.farmers_buddy_backend.repository;

import com.farmersbuddy.farmers_buddy_backend.entity.CropRecommendation;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CropRecommendationRepository
        extends JpaRepository<CropRecommendation, Long> {
}