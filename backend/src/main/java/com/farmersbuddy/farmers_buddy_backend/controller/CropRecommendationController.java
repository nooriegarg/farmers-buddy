package com.farmersbuddy.farmers_buddy_backend.controller;

import com.farmersbuddy.farmers_buddy_backend.entity.CropRecommendation;
import com.farmersbuddy.farmers_buddy_backend.repository.CropRecommendationRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin(origins = "http://localhost:5173")
public class CropRecommendationController {

    private final CropRecommendationRepository repository;

    public CropRecommendationController(
            CropRecommendationRepository repository
    ) {
        this.repository = repository;
    }

    @PostMapping
    public CropRecommendation addRecommendation(
            @RequestBody CropRecommendation recommendation
    ) {

        return repository.save(recommendation);
    }

    @GetMapping
    public List<CropRecommendation> getAllRecommendations() {

        return repository.findAll();
    }
}
