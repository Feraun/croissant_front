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

export const clientService = {
    getUserData: () => api.get(`/client/me`),

    getAllInstitutionByClient: (params) => api.get("/client/institutions", {
      params: {
        name: params.name,
        page: params.page,
        size: params.size,
        sortBy: params.sortBy,
        direction: params.direction,
      },
    }),

    getAllInstitutionByAdmin: (params) => api.get("/admin/institutions", {
      params: {
        name: params.name,
        page: params.page,
        size: params.size,
        sortBy: params.sortBy,
        direction: params.direction,
      },
    }),

    getInstitutionByIdByClient: (id) => api.get(`/client/institutions/${id}`),

    buyBox: (id) => api.patch(`client/boxes/${id}`)
};


export default clientService;