package com.farmersbuddy.service;

import com.farmersbuddy.dto.CropRecommendationRequest;
import com.farmersbuddy.dto.CropRecommendationResponse;

import java.util.List;

public interface CropRecommendationService {
    CropRecommendationResponse create(CropRecommendationRequest request, String officerUsername);
    CropRecommendationResponse getById(Long id);
    List<CropRecommendationResponse> getAll();
    List<CropRecommendationResponse> getAllActive();
    List<CropRecommendationResponse> getByCrop(String cropName);
    List<CropRecommendationResponse> getBySeason(String season);
    List<CropRecommendationResponse> getByRegion(String region);
    CropRecommendationResponse update(Long id, CropRecommendationRequest request);
    CropRecommendationResponse toggleActive(Long id);
    void delete(Long id);
}