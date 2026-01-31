import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/admin';
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export const adminCitiesService = {
  searchCities: (params) => api.get("/cities", {
      params: {
        name: params.name,
        page: params.page,
        size: params.size,
        sortBy: params.sortBy,
        direction: params.direction,
      },
    }),

  deleteCity: (id) => api.delete(`/cities/${id}`),

  editCity: (id, data) =>
    api.patch(`/cities/editCity/${id}`, {
    name: data.name,
    region: data.region,
  }),


  getCityById: (id) => api.get(`/cities/${id}`),

  createCity: (data) => api.post(`/cities/createCity`, {
    name: data.name,
    region: data.region
  }),

  getAllCities: () => api.get(`/allCities`)
};

export default adminCitiesService;