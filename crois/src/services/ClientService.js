import Search from 'antd/es/transfer/search';
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
    getUserData: () => api.get(`/client/profile`),

    getAllInstitutionByClient: (params) => api.get(`/client/institutions`,
      {
        params: {
        page: params.page,
        size: params.size,
        cityName: params.name,
        sort: params.sort}
      }
    ),

    getInstitutionByIdByClient: (id) => api.get(`/client/institutions/${id}`),

    buyBox: (id) => api.patch(`/client/boxes/${id}`)
};


export default clientService;