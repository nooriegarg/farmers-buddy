// =============================================================
// toolService.js — Tools Catalog API Calls
// =============================================================
// Handles all HTTP calls for the dynamic Tools Catalog module.
// Admin can add/delete tools; all users can browse.
// =============================================================

import API from "./api"

// Admin adds a new farming tool to the catalog
export const addTool = (data) =>
  API.post("/tools", data).then((res) => res.data)

// All users browse the full tools catalog
export const getAllTools = () =>
  API.get("/tools").then((res) => res.data)

// Admin removes a tool from the catalog by ID
export const deleteTool = (id) =>
  API.delete(`/tools/${id}`).then((res) => res.data)
