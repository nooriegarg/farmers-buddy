package com.farmersbuddy.controller;

import com.farmersbuddy.dto.ApiResponse;
import com.farmersbuddy.dto.CropRecommendationRequest;
import com.farmersbuddy.dto.CropRecommendationResponse;
import com.farmersbuddy.service.CropRecommendationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Crop Recommendation endpoints.
 * Base: /api/recommendations
 */
@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
@Slf4j
public class CropRecommendationController {

    private final CropRecommendationService cropService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER')")
    public ResponseEntity<ApiResponse<CropRecommendationResponse>> create(
            @Valid @RequestBody CropRecommendationRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        CropRecommendationResponse response = cropService.create(request, userDetails.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Recommendation created", response));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER','FARMER')")
    public ResponseEntity<ApiResponse<CropRecommendationResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Recommendation fetched", cropService.getById(id)));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER','FARMER')")
    public ResponseEntity<ApiResponse<List<CropRecommendationResponse>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success("All recommendations", cropService.getAllActive()));
    }

    @GetMapping("/crop/{cropName}")
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER','FARMER')")
    public ResponseEntity<ApiResponse<List<CropRecommendationResponse>>> getByCrop(@PathVariable String cropName) {
        return ResponseEntity.ok(ApiResponse.success("Recommendations by crop", cropService.getByCrop(cropName)));
    }

    @GetMapping("/season/{season}")
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER','FARMER')")
    public ResponseEntity<ApiResponse<List<CropRecommendationResponse>>> getBySeason(@PathVariable String season) {
        return ResponseEntity.ok(ApiResponse.success("Recommendations by season", cropService.getBySeason(season)));
    }

    @GetMapping("/region/{region}")
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER','FARMER')")
    public ResponseEntity<ApiResponse<List<CropRecommendationResponse>>> getByRegion(@PathVariable String region) {
        return ResponseEntity.ok(ApiResponse.success("Recommendations by region", cropService.getByRegion(region)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER')")
    public ResponseEntity<ApiResponse<CropRecommendationResponse>> update(
            @PathVariable Long id, @Valid @RequestBody CropRecommendationRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Recommendation updated", cropService.update(id, request)));
    }

    @PatchMapping("/{id}/toggle")
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER')")
    public ResponseEntity<ApiResponse<CropRecommendationResponse>> toggleActive(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Status toggled", cropService.toggleActive(id)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        cropService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Recommendation deleted"));
    }
}