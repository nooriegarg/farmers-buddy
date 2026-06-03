// =============================================================
// soilAnalysisService.js — Soil Analysis API Calls
// =============================================================
// Calls the rule-based backend soil analysis endpoint.
// Sends { soilType, region, season } and receives { crop, fertilizer, tip }.
// =============================================================

import API from "./api"

// POST /api/soil — get crop and fertilizer recommendation from backend
export const analyzeSoil = (data) =>
  API.post("/soil", data).then((res) => res.data)
