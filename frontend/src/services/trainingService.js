// =============================================================
// trainingService.js — Training Module API Calls
// =============================================================
// Handles all HTTP calls related to training sessions and enrollments.
// All functions use the shared Axios instance from api.js (baseURL: /api).
// =============================================================

import API from "./api"

// Officer creates a new training session
export const createTraining = (data) =>
  API.post("/trainings", data).then((res) => res.data)

// All users load all available trainings
export const getAllTrainings = () =>
  API.get("/trainings").then((res) => res.data)

// Farmer enrolls in a training session
export const enrollTraining = (data) =>
  API.post("/trainings/enroll", data).then((res) => res.data)

// Farmer loads their own enrollments (to check join status)
export const getMyEnrollments = (farmerId) =>
  API.get(`/trainings/farmer/${farmerId}`).then((res) => res.data)

// Officer views all farmers who enrolled in a specific training
export const getTrainingEnrollments = (trainingId) =>
  API.get(`/trainings/${trainingId}/enrollments`).then((res) => res.data)
