// =============================================================
// recommendationService.js — Smart Crop Suggestion API Calls
// =============================================================
// Calls the backend rule-based crop suggestion endpoint.
// Sends { region, season, soilType } and receives an array of crop suggestions.
// Each suggestion: { cropName, fertilizer, note }
// =============================================================

import API from "./api"

// POST /api/recommendations/suggest — get smart crop suggestions
export const suggestCrops = (data) =>
  API.post("/recommendations/suggest", data).then((res) => res.data)
