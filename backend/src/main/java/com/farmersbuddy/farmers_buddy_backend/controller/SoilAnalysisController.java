package com.farmersbuddy.farmers_buddy_backend.controller;

import com.farmersbuddy.farmers_buddy_backend.dto.SoilAnalysisRequest;
import com.farmersbuddy.farmers_buddy_backend.dto.SoilAnalysisResponse;
import com.farmersbuddy.farmers_buddy_backend.service.SoilAnalysisService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

// =============================================================
// SoilAnalysisController.java — REST Controller for Soil Analysis
// =============================================================
// Exposes a single POST endpoint that accepts soil type, region,
// and season inputs and returns a rule-based crop recommendation.
//
// Base URL: /api/soil
//
// Endpoint:
//   POST /api/soil → accepts SoilAnalysisRequest, returns SoilAnalysisResponse
//
// NO database access — pure rule-based logic in SoilAnalysisService.
// =============================================================

@RestController
@RequestMapping("/api/soil")
@CrossOrigin("*")
public class SoilAnalysisController {

    @Autowired
    private SoilAnalysisService soilAnalysisService;

    // -------------------------
    // POST /api/soil
    // -------------------------
    // Accepts { soilType, region, season } and returns
    // { crop, fertilizer, tip } based on rule-based logic.
    @PostMapping
    public SoilAnalysisResponse analyzeSoil(
            @RequestBody SoilAnalysisRequest request
    ) {
        return soilAnalysisService.getRecommendation(request);
    }
}
