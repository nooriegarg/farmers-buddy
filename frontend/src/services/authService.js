// =============================================================
// authService.js — Authentication API Calls
// =============================================================
// Handles all HTTP requests related to user authentication.
// Uses the shared Axios instance (API) to communicate with the
// Spring Boot AuthController at /api/auth/*.
//
// API Flow:
//   registerUser → POST /api/auth/register → AuthController → AuthService → UserRepository → MySQL
//   loginUser    → POST /api/auth/login    → AuthController → AuthService → UserRepository → MySQL
// =============================================================

import API from "./api"

// -------------------------
// Register a new user
// -------------------------
// Sends user registration data (name, email, password, role) to the backend.
// The backend checks for duplicate emails before saving to the database.
export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData)
  return response.data
}

// -------------------------
// Login an existing user
// -------------------------
// Sends email and password to the backend for validation.
// On success, the backend returns the full User object (including role),
// which is then stored in localStorage for session management.
export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData)
  return response.data
}
