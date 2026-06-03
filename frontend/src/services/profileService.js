import API from "./api"

export const getProfile = (id) =>
  API.get(`/auth/profile/${id}`).then((res) => res.data)

export const updateProfile = (id, data) =>
  API.put(`/auth/profile/${id}`, data).then((res) => res.data)
