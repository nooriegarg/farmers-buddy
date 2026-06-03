package com.farmersbuddy.farmers_buddy_backend.dto;

// =============================================================
// SoilAnalysisResponse.java — DTO for Soil Analysis API Output
// =============================================================
// Carries the three outputs returned by the rule-based service:
//   - crop       : recommended crop name
//   - fertilizer : recommended fertilizer
//   - tip        : practical farming tip for the combination
//
// Serialized to JSON by Spring and returned to the React frontend.
// =============================================================

public class SoilAnalysisResponse {

    private String crop;
    private String fertilizer;
    private String tip;

    public SoilAnalysisResponse() {}

    public SoilAnalysisResponse(String crop, String fertilizer, String tip) {
        this.crop = crop;
        this.fertilizer = fertilizer;
        this.tip = tip;
    }

    public String getCrop() { return crop; }
    public void setCrop(String crop) { this.crop = crop; }

    public String getFertilizer() { return fertilizer; }
    public void setFertilizer(String fertilizer) { this.fertilizer = fertilizer; }

    public String getTip() { return tip; }
    public void setTip(String tip) { this.tip = tip; }
}
