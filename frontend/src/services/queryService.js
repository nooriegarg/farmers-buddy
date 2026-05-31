import api from './axiosInstance';
export default {
  create: (data) => api.post('/queries', data),
  getAll: () => api.get('/queries'),
  getById: (id) => api.get(`/queries/${id}`),
  getByFarmer: (id) => api.get(`/queries/farmer/${id}`),
  getByStatus: (s) => api.get(`/queries/status/${s}`),
  answer: (id, data) => api.put(`/queries/${id}/answer`, data),
  assign: (id, officerId) => api.put(`/queries/${id}/assign/${officerId}`),
  updateStatus: (id, status) => api.patch(`/queries/${id}/status?status=${status}`),
  remove: (id) => api.delete(`/queries/${id}`),
};