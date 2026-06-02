package com.farmersbuddy.farmers_buddy_backend.controller;

import com.farmersbuddy.farmers_buddy_backend.entity.CropRecommendation;
import com.farmersbuddy.farmers_buddy_backend.repository.CropRecommendationRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

// =============================================================
// CropRecommendationController.java — REST Controller for Crop Recommendations
// =============================================================
// Exposes HTTP endpoints for adding and retrieving crop recommendations.
// Unlike other controllers, this one injects the repository directly
// (no separate service layer) since the logic is straightforward.
//
// Base URL: /api/recommendations
//
// Endpoints:
//   POST /api/recommendations → add a new crop recommendation
//   GET  /api/recommendations → retrieve all crop recommendations
//
// Note: The constructor injection pattern is used here (instead of @Autowired
// field injection) — both approaches work identically with Spring IoC.
//
// CORS is restricted to http://localhost:5173 for this controller,
// unlike other controllers which use @CrossOrigin("*").
// =============================================================

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin(origins = "http://localhost:5173")
public class CropRecommendationController {

    // Repository injected via constructor (constructor injection pattern)
    private final CropRecommendationRepository repository;

    public CropRecommendationController(
            CropRecommendationRepository repository
    ) {
        this.repository = repository;
    }

    // -------------------------
    // POST /api/recommendations
    // -------------------------
    // Adds a new crop recommendation to the database.
    // Accepts a CropRecommendation JSON body (cropName, season, recommendation).
    @PostMapping
    public CropRecommendation addRecommendation(
            @RequestBody CropRecommendation recommendation
    ) {

        return repository.save(recommendation);
    }

    // -------------------------
    // GET /api/recommendations
    // -------------------------
    // Returns all crop recommendations from the database.
    @GetMapping
    public List<CropRecommendation> getAllRecommendations() {

        return repository.findAll();
    }
}
