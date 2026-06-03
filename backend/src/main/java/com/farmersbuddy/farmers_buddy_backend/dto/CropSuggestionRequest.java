package com.farmersbuddy.farmers_buddy_backend.dto;

// =============================================================
// CropSuggestionRequest.java — DTO for Crop Suggestion API Input
// =============================================================
// Carries the three inputs for the smart crop recommendation engine:
//   - region   : North India / South India / East India / West India
//   - season   : Summer / Winter / Monsoon
//   - soilType : Loamy / Clay / Sandy / Black / Red
//
// Deserialized from JSON by Spring's @RequestBody in CropRecommendationController.
// =============================================================

public class CropSuggestionRequest {

    private String region;
    private String season;
    private String soilType;

    public CropSuggestionRequest() {}

    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }

    public String getSeason() { return season; }
    public void setSeason(String season) { this.season = season; }

    public String getSoilType() { return soilType; }
    public void setSoilType(String soilType) { this.soilType = soilType; }
}
