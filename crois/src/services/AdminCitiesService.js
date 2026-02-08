import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/admin/cities';
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
  searchCities: (params) => api.get("", {
    params: {
    page: params.page,
    size: params.size,
    cityName: params.name,
    sort: params.sort}
  }),

  deleteCity: (id) => api.delete(`/${id}`),

  editCity: (id, data) =>
    api.patch(`/editCity/${id}`, {
    name: data.name,
    region: data.region,
  }),


  getCityById: (id) => api.get(`/${id}`),

  createCity: (data) => api.post(`/createCity`, {
    name: data.name,
    region: data.region
  }),

  getAllCities: () => api.get(`/getAll`)
};

export default adminCitiesService;