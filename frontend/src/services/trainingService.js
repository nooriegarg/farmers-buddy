import api from './axiosInstance';
export default {
  create: (data) => api.post('/training-programs', data),
  getAll: () => api.get('/training-programs'),
  getById: (id) => api.get(`/training-programs/${id}`),
  getUpcoming: () => api.get('/training-programs/upcoming'),
  getByTopic: (t) => api.get(`/training-programs/topic/${t}`),
  update: (id, data) => api.put(`/training-programs/${id}`, data),
  toggle: (id) => api.patch(`/training-programs/${id}/toggle`),
  enroll: (id) => api.patch(`/training-programs/${id}/enroll`),
  remove: (id) => api.delete(`/training-programs/${id}`),
};