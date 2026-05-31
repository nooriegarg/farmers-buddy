import api from './axiosInstance';
export default {
  create: (data) => api.post('/recommendations', data),
  getAll: () => api.get('/recommendations'),
  getById: (id) => api.get(`/recommendations/${id}`),
  getByCrop: (n) => api.get(`/recommendations/crop/${n}`),
  getBySeason: (s) => api.get(`/recommendations/season/${s}`),
  getByRegion: (r) => api.get(`/recommendations/region/${r}`),
  update: (id, data) => api.put(`/recommendations/${id}`, data),
  toggle: (id) => api.patch(`/recommendations/${id}/toggle`),
  remove: (id) => api.delete(`/recommendations/${id}`),
};