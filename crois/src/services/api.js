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

export const apiService = {
  registration: (userData) => api.post('/registration', userData),
  login: (credentials) => api.post('/login', credentials),


};


export default apiService;