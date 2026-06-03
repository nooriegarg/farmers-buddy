// =============================================================
// queryService.js — Query Management API Calls
// =============================================================
// Handles all HTTP requests related to farmer queries.
// Communicates with the Spring Boot QueryController at /api/queries/*.
//
// API Flow:
//   createQuery        → POST   /api/queries           → Save new query (status: PENDING)
//   getAllQueries       → GET    /api/queries           → Fetch all queries (Officer view)
//   replyToQuery        → PUT    /api/queries/{id}/reply → Officer submits reply (status: RESOLVED)
//   getQueriesByFarmer  → GET    /api/queries/farmer/{id} → Fetch queries for a specific farmer
// =============================================================

import API from "./api"

// -------------------------
// Create a new query
// -------------------------
// Called from FarmerDashboard when a farmer submits a new agriculture query.
// The backend auto-sets the status to "PENDING" on creation.
export const createQuery = async (queryData) => {
  const response = await API.post("/queries", queryData)
  return response.data
}

// -------------------------
// Get all queries
// -------------------------
// Used by the Officer Dashboard to load every query submitted by all farmers.
export const getAllQueries = async () => {
  const response = await API.get("/queries")
  return response.data
}

// -------------------------
// Reply to a query (Officer action)
// -------------------------
// Sends the officer's reply text via a PUT request.
// The backend updates the officerReply field and changes status to "RESOLVED".
export const replyToQuery = async (id, replyData) => {

  const response = await API.put(
    `/queries/${id}/reply`,
    replyData
  )

  return response.data
}

// -------------------------
// Get queries by farmer ID
// -------------------------
// Used by the Farmer Dashboard to load only queries belonging to the logged-in farmer.
// Filters by farmerId on the backend using a custom JPA query.
export const getQueriesByFarmer = async (farmerId) => {

  const response = await API.get(
    `/queries/farmer/${farmerId}`
  )

  return response.data
}

export const deleteQuery = (id) =>
  API.delete(`/queries/${id}`).then((res) => res.data)
