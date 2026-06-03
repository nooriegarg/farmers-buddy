// =============================================================
// awarenessService.js — Awareness Drives API Calls
// =============================================================
// Handles all HTTP calls for the dynamic Awareness Drives module.
// Admin/Officer can create drives; Admin can delete; all can view.
// =============================================================

import API from "./api"

// Admin or Officer publishes a new awareness drive
export const createAwarenessDrive = (data) =>
  API.post("/awareness", data).then((res) => res.data)

// All users fetch all published awareness drives
export const getAllAwarenessDrives = () =>
  API.get("/awareness").then((res) => res.data)

// Admin deletes an awareness drive by ID
export const deleteAwarenessDrive = (id) =>
  API.delete(`/awareness/${id}`).then((res) => res.data)
