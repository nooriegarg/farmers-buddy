package com.farmersbuddy.farmers_buddy_backend.service;

import com.farmersbuddy.farmers_buddy_backend.dto.CropSuggestionRequest;

import org.springframework.stereotype.Service;

import java.util.*;

// =============================================================
// CropRecommendationService.java — Rule-Based Crop Suggestion Logic
// =============================================================
// Returns 2-3 crop suggestions based on:
//   - region   : North India / South India / East India / West India
//   - season   : Summer / Winter / Monsoon
//   - soilType : Loamy / Clay / Sandy / Black / Red
//
// Each suggestion is a Map with:
//   cropName   — recommended crop
//   fertilizer — suitable fertilizer
//   note       — brief agronomic advice
//
// Logic is simple if-else — NO ML, NO AI, viva-explainable.
// =============================================================

@Service
public class CropRecommendationService {

    public List<Map<String, String>> suggest(CropSuggestionRequest req) {

        String region = req.getRegion()   != null ? req.getRegion().trim()   : "";
        String season = req.getSeason()   != null ? req.getSeason().trim()   : "";
        String soil   = req.getSoilType() != null ? req.getSoilType().trim() : "";

        List<Map<String, String>> suggestions = new ArrayList<>();

        // ---- North India ----
        if (region.contains("North")) {
            if (season.equalsIgnoreCase("Winter")) {
                suggestions.add(crop("Wheat",   "Urea (Nitrogen)",         "Best Rabi crop for North India. Sow Oct–Nov, harvest March–April."));
                suggestions.add(crop("Mustard",  "DAP + Sulphur",           "Cold-tolerant oilseed. Needs well-drained loamy or clay soil."));
                suggestions.add(crop("Chickpea", "Rhizobium + Phosphorus",  "Legume — fixes nitrogen naturally. Good for soil health rotation."));
            } else if (season.equalsIgnoreCase("Summer")) {
                suggestions.add(crop("Sunflower",  "Boron + NPK 12:32:16",  "Short-duration oilseed. Tolerates heat well in North India plains."));
                suggestions.add(crop("Watermelon", "Potassium + Compost",   "Sandy loam soil preferred. High water demand — use drip irrigation."));
            } else { // Monsoon
                suggestions.add(crop("Rice",    "Urea + Zinc Sulphate",   "Kharif staple for North India. Requires flooded fields for paddy variety."));
                suggestions.add(crop("Maize",   "NPK 20:20:20",           "Non-paddy alternative. Grows well in loamy well-drained North India soil."));
                suggestions.add(crop("Soybean", "Rhizobium Biofertilizer","Protein-rich legume. Improves soil nitrogen — good for crop rotation."));
            }
        }

        // ---- South India ----
        else if (region.contains("South")) {
            if (season.equalsIgnoreCase("Winter")) {
                suggestions.add(crop("Rabi Sorghum", "NPK 10:26:26",     "South India winter is mild. Sorghum adapts well to red and clay soils."));
                suggestions.add(crop("Tomato",       "Calcium + Boron",  "Cool season boosts fruit quality. Use staking and drip irrigation."));
            } else if (season.equalsIgnoreCase("Summer")) {
                suggestions.add(crop("Sesame",     "Phosphorus + Potassium", "Drought-tolerant oilseed for South India hot summers."));
                suggestions.add(crop("Groundnut",  "Gypsum + DAP",           "Widely grown in Andhra, Karnataka. Needs sandy-loam well-drained soil."));
                suggestions.add(crop("Turmeric",   "Organic Compost",        "High-value spice crop. Requires partial shade and regular irrigation."));
            } else { // Monsoon
                suggestions.add(crop("Paddy (Rice)", "Urea + Zinc Sulphate",  "Primary Kharif crop in South India. Clay soils ideal for wet paddy."));
                suggestions.add(crop("Finger Millet","DAP + Potassium",       "Hardy crop for red soils. Nutritious grain, low water requirement."));
                suggestions.add(crop("Sugarcane",    "Nitrogen + Potassium",   "Long-duration crop (10–12 months). High water need — canal irrigation preferred."));
            }
        }

        // ---- East India ----
        else if (region.contains("East")) {
            if (season.equalsIgnoreCase("Winter")) {
                suggestions.add(crop("Potato",       "Potassium + Compost",  "East India cool winters are perfect for potato. Apply potassium for larger tubers."));
                suggestions.add(crop("Mustard",      "DAP + Sulphur",        "Common Rabi crop in Bihar, West Bengal. Well-drained loamy soil preferred."));
                suggestions.add(crop("Winter Maize", "Urea + Zinc",          "Short-duration hybrid maize for mild East India winters."));
            } else if (season.equalsIgnoreCase("Summer")) {
                suggestions.add(crop("Jute",     "Nitrogen + Compost",   "East India's hot humid summer is ideal for jute cultivation."));
                suggestions.add(crop("Sesame",   "Phosphorus + Potassium","Short-duration crop for summer. Needs warm and dry harvest conditions."));
            } else { // Monsoon
                suggestions.add(crop("Paddy (Rice)", "Urea + Zinc Sulphate", "Primary crop in Bengal, Odisha, Jharkhand. Clay soils and monsoon rain essential."));
                suggestions.add(crop("Cassava",      "Potassium + Organic",   "Tolerates poor soils. Sandy loam preferred. High starch content."));
                suggestions.add(crop("Arhar (Pigeon Pea)", "Phosphorus",      "Long-duration legume. Drought tolerant, good for mixed cropping."));
            }
        }

        // ---- West India ----
        else if (region.contains("West")) {
            if (season.equalsIgnoreCase("Winter")) {
                suggestions.add(crop("Cumin",       "DAP + Micronutrients", "West India winter suits cumin. Avoid over-irrigation — drip is best."));
                suggestions.add(crop("Coriander",   "Urea + Phosphorus",    "Popular spice crop in Rajasthan, Gujarat winters. Sandy loam preferred."));
                suggestions.add(crop("Wheat",       "Urea + DAP",           "Grown in irrigated zones of West India. Loamy soil gives best results."));
            } else if (season.equalsIgnoreCase("Summer")) {
                suggestions.add(crop("Bajra (Millet)", "Compost + Low Urea",    "Extremely drought-tolerant. Ideal for sandy soils of Rajasthan in summer."));
                suggestions.add(crop("Cluster Bean",   "Rhizobium + Phosphorus","Drought-hardy legume. Important for guar gum production."));
            } else { // Monsoon
                suggestions.add(crop("Cotton",   "Nitrogen + Potassium",    "Black cotton soil in Gujarat and Maharashtra thrives in monsoon."));
                suggestions.add(crop("Groundnut","Gypsum + DAP",            "Major crop in Gujarat. Sandy loam soil and monsoon rain ideal."));
                suggestions.add(crop("Soybean",  "Rhizobium Biofertilizer", "Grows well in black soil of West India during monsoon season."));
            }
        }

        // ---- Fallback if no region matched ----
        if (suggestions.isEmpty()) {
            suggestions.add(crop("Maize",   "NPK 20:20:20",        "Versatile crop suitable for most Indian regions and soil types."));
            suggestions.add(crop("Soybean", "Rhizobium + DAP",     "Nitrogen-fixing legume that improves soil health. Good for rotation."));
            suggestions.add(crop("Bajra",   "Compost + Low Urea",  "Drought-tolerant millet. Grows in poor soils with minimal inputs."));
        }

        return suggestions;
    }

    // Helper method to build a suggestion map cleanly
    private Map<String, String> crop(String cropName, String fertilizer, String note) {
        Map<String, String> map = new HashMap<>();
        map.put("cropName",   cropName);
        map.put("fertilizer", fertilizer);
        map.put("note",       note);
        return map;
    }
}
