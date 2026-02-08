import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/admin/users';
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

export const adminUsersService = {

  getAllUsers: () => api.get(`/getAll`)
};

export default adminUsersService;