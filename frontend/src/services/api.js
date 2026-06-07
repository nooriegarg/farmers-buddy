// =============================================================
// api.js — Axios Base Instance
// =============================================================
// This file creates a single, reusable Axios instance that all
// service files import. By setting baseURL here once, every API
// call in the app automatically targets the Spring Boot backend
// running on port 8080.
//
// Request Interceptor:
//   Automatically attaches the logged-in user's role as the
//   X-User-Role header on every outgoing request.
//   The backend uses this header to enforce basic role checks
//   on sensitive endpoints (admin, officer actions).
//
// Flow: Service file → API instance → Spring Boot backend
// =============================================================

import axios from "axios"

// Create the Axios instance with the backend base URL.
// All relative paths like "/auth/login" are resolved against this.
const API = axios.create({
  baseURL: "http://localhost:8080/api",
})

// Attach user role header to every request automatically
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user") || "null")
  if (user?.role) {
    config.headers["X-User-Role"] = user.role
  }
  return config
})

export default API
