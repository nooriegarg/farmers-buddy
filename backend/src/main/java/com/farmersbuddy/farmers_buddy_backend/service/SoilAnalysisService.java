package com.farmersbuddy.farmers_buddy_backend.service;

import com.farmersbuddy.farmers_buddy_backend.dto.SoilAnalysisRequest;
import com.farmersbuddy.farmers_buddy_backend.dto.SoilAnalysisResponse;

import org.springframework.stereotype.Service;

// =============================================================
// SoilAnalysisService.java — Rule-Based Soil Analysis Logic
// =============================================================
// Provides crop + fertilizer recommendations based on:
//   - soilType : Loamy / Clay / Sandy / Black / Red
//   - region   : North India / South India / East India / West India
//   - season   : Summer / Winter / Monsoon
//
// NO machine learning. NO AI. Pure if-else rules that are
// easy to understand and explain during a viva.
//
// Logic: checks season first, then soil type, then region
// for the most accurate recommendation. Falls back to Maize
// as a general purpose crop for unmatched combinations.
// =============================================================

@Service
public class SoilAnalysisService {

    public SoilAnalysisResponse getRecommendation(SoilAnalysisRequest req) {

        String soil   = req.getSoilType()  != null ? req.getSoilType().trim()  : "";
        String region = req.getRegion()    != null ? req.getRegion().trim()    : "";
        String season = req.getSeason()    != null ? req.getSeason().trim()    : "";

        // ---- Winter Season ----
        if (season.equalsIgnoreCase("Winter")) {

            if (soil.equalsIgnoreCase("Loamy") && region.contains("North")) {
                return new SoilAnalysisResponse("Wheat", "Nitrogen-rich Fertilizer (Urea)",
                    "Sow in October–November. Top-dress with urea at tillering stage for best yield.");
            }
            if (soil.equalsIgnoreCase("Clay") && region.contains("North")) {
                return new SoilAnalysisResponse("Mustard", "DAP + Sulphur",
                    "Ensure proper drainage in clay soil before sowing mustard. Apply sulphur for better oil content.");
            }
            if (soil.equalsIgnoreCase("Sandy") && region.contains("North")) {
                return new SoilAnalysisResponse("Barley", "Low-dose Urea + Compost",
                    "Sandy soils dry quickly — mix organic matter and irrigate regularly during grain filling.");
            }
            if (region.contains("South")) {
                return new SoilAnalysisResponse("Rabi Sorghum", "NPK 10:26:26",
                    "South India winter is mild — sorghum adapts well. Use balanced NPK for healthy grain development.");
            }
            if (region.contains("East")) {
                return new SoilAnalysisResponse("Potato", "Potassium + Compost",
                    "East India's cool winters are ideal for potato. Apply potassium to improve tuber size.");
            }
            if (region.contains("West")) {
                return new SoilAnalysisResponse("Cumin", "DAP + Micronutrients",
                    "West India's dry winter is ideal for cumin. Avoid overwatering — use drip irrigation.");
            }
            // Generic winter fallback
            return new SoilAnalysisResponse("Wheat", "Nitrogen Fertilizer (Urea)",
                "Winter is ideal for Rabi crops. Ensure soil moisture before sowing.");
        }

        // ---- Monsoon Season ----
        if (season.equalsIgnoreCase("Monsoon")) {

            if (soil.equalsIgnoreCase("Clay") && (region.contains("South") || region.contains("East"))) {
                return new SoilAnalysisResponse("Paddy (Rice)", "Urea + Zinc Sulphate",
                    "Flooded clay soil is ideal for paddy. Apply urea in split doses for better nitrogen use.");
            }
            if (soil.equalsIgnoreCase("Black") && region.contains("West")) {
                return new SoilAnalysisResponse("Cotton", "Nitrogen + Potassium Mix",
                    "Black cotton soil thrives in monsoon. Apply potassium during boll formation stage.");
            }
            if (soil.equalsIgnoreCase("Loamy")) {
                return new SoilAnalysisResponse("Maize", "NPK 20:20:20",
                    "Loamy soil with good drainage is perfect for monsoon maize. Apply basal fertilizer before sowing.");
            }
            if (soil.equalsIgnoreCase("Sandy")) {
                return new SoilAnalysisResponse("Groundnut", "Phosphorus + Gypsum",
                    "Sandy soils suit groundnut in monsoon. Apply gypsum at pegging stage for better pod filling.");
            }
            if (soil.equalsIgnoreCase("Red")) {
                return new SoilAnalysisResponse("Soybean", "Rhizobium Biofertilizer + DAP",
                    "Red soil with good drainage suits soybean. Rhizobium inoculation reduces need for nitrogen fertilizer.");
            }
            // Generic monsoon fallback
            return new SoilAnalysisResponse("Rice", "Urea + Organic Compost",
                "Monsoon season is ideal for Kharif crops. Ensure proper drainage to avoid waterlogging.");
        }

        // ---- Summer Season ----
        if (season.equalsIgnoreCase("Summer")) {

            if (soil.equalsIgnoreCase("Loamy") && region.contains("North")) {
                return new SoilAnalysisResponse("Sunflower", "Boron + NPK 12:32:16",
                    "Loamy soil with good water retention suits summer sunflower. Apply boron to prevent flower drop.");
            }
            if (soil.equalsIgnoreCase("Black")) {
                return new SoilAnalysisResponse("Sugarcane", "Potassium + Nitrogen Fertilizer",
                    "Black soil retains moisture well for sugarcane. Earthing-up at 45 and 90 days improves yield.");
            }
            if (soil.equalsIgnoreCase("Sandy") && region.contains("West")) {
                return new SoilAnalysisResponse("Millet (Bajra)", "Compost + Low-dose Urea",
                    "Bajra is drought-tolerant and ideal for sandy soils in hot summer. Minimal water requirement.");
            }
            if (soil.equalsIgnoreCase("Clay") && region.contains("South")) {
                return new SoilAnalysisResponse("Sesame", "Phosphorus + Potassium",
                    "Summer sesame in clay soil of south India needs well-drained raised beds. Space plants 30 cm apart.");
            }
            if (region.contains("East")) {
                return new SoilAnalysisResponse("Jute", "Nitrogen + Compost",
                    "East India's hot humid summer is ideal for jute. Sow in March–April for best fibre quality.");
            }
            // Generic summer fallback
            return new SoilAnalysisResponse("Millet", "Compost + Potassium Fertilizer",
                "Summer crops need drought-tolerant varieties. Ensure irrigation every 7-10 days.");
        }

        // ---- Final fallback (no season match) ----
        return new SoilAnalysisResponse("Maize", "Potassium Fertilizer",
            "Maize is a versatile crop suitable for most soil types. Apply split doses of fertilizer for best results.");
    }
}
