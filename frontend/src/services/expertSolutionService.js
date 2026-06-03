import API from "./api"

export const addSolution = (data) =>
  API.post("/solutions", data).then((res) => res.data)

export const getAllSolutions = () =>
  API.get("/solutions").then((res) => res.data)

export const getMySolutions = (expertId) =>
  API.get(`/solutions/expert/${expertId}`).then((res) => res.data)

export const deleteSolution = (id) =>
  API.delete(`/solutions/${id}`).then((res) => res.data)

export const updateSolution = (id, data) =>
  API.put(`/solutions/${id}`, data).then((res) => res.data)
