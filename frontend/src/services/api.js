// =============================================================
// api.js — Axios Base Instance
// =============================================================
// This file creates a single, reusable Axios instance that all
// service files import. By setting baseURL here once, every API
// call in the app automatically targets the Spring Boot backend
// running on port 8080.
//
// Flow: Service file → API instance → Spring Boot backend
// =============================================================

import axios from "axios"

// Create the Axios instance with the backend base URL.
// All relative paths like "/auth/login" are resolved against this.
const API = axios.create({
  baseURL: "http://localhost:8080/api",
})

export default API
