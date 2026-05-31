import api from './axiosInstance';
export default {
  create: (data) => api.post('/mandi-prices', data),
  getAll: () => api.get('/mandi-prices'),
  getById: (id) => api.get(`/mandi-prices/${id}`),
  getByCrop: (n) => api.get(`/mandi-prices/crop/${n}`),
  getByMarket: (m) => api.get(`/mandi-prices/market/${m}`),
  getByState: (s) => api.get(`/mandi-prices/state/${s}`),
  getByDate: (d) => api.get(`/mandi-prices/date/${d}`),
  getByRange: (f, t) => api.get(`/mandi-prices/range?from=${f}&to=${t}`),
  update: (id, data) => api.put(`/mandi-prices/${id}`, data),
  remove: (id) => api.delete(`/mandi-prices/${id}`),
};