import api from './axiosInstance';
export default {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  getByRole: (role) => api.get(`/users/role/${role}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  toggle: (id) => api.patch(`/users/${id}/toggle-status`),
  remove: (id) => api.delete(`/users/${id}`),
};