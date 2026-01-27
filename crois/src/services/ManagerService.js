import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';
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

export const managerService = {
    getMyInstitutions: (params) => api.get("/manager/institutions", {
      params: {
        name: params.name,
        page: params.page,
        size: params.size,
        sortBy: params.sortBy,
        direction: params.direction,
      },
    }),
};


export default managerService;