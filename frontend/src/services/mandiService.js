// =============================================================
// mandiService.js — Mandi Prices API Calls
// =============================================================
// Handles all HTTP calls for the Mandi Prices module.
// Admin publishes/deletes prices; farmers view current market rates.
// =============================================================

import API from "./api"

// Admin publishes a new mandi price entry
export const addMandiPrice = (data) =>
  API.post("/mandi", data).then((res) => res.data)

// All users fetch all published mandi prices
export const getAllMandiPrices = () =>
  API.get("/mandi").then((res) => res.data)

// Admin removes an outdated price entry by ID
export const deleteMandiPrice = (id) =>
  API.delete(`/mandi/${id}`).then((res) => res.data)
