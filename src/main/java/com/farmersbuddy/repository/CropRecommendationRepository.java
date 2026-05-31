package com.farmersbuddy.repository;

import com.farmersbuddy.entity.CropRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropRecommendationRepository extends JpaRepository<CropRecommendation, Long> {

    List<CropRecommendation> findAllByActiveTrue();

    List<CropRecommendation> findAllByCropNameIgnoreCase(String cropName);

    List<CropRecommendation> findAllBySeasonIgnoreCase(String season);

    List<CropRecommendation> findAllByRegionIgnoreCaseAndActiveTrue(String region);

    List<CropRecommendation> findAllByCreatedById(Long officerId);
}