package com.farmersbuddy.farmers_buddy_backend.dto;

// =============================================================
// SoilAnalysisRequest.java — DTO for Soil Analysis API Input
// =============================================================
// Carries the three inputs the farmer selects in the UI:
//   - soilType : Loamy / Clay / Sandy / Black / Red
//   - region   : North India / South India / East India / West India
//   - season   : Summer / Winter / Monsoon
//
// Deserialized from JSON by Spring's @RequestBody in SoilAnalysisController.
// =============================================================

public class SoilAnalysisRequest {

    private String soilType;
    private String region;
    private String season;

    public SoilAnalysisRequest() {}

    public String getSoilType() { return soilType; }
    public void setSoilType(String soilType) { this.soilType = soilType; }

    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }

    public String getSeason() { return season; }
    public void setSeason(String season) { this.season = season; }
}
