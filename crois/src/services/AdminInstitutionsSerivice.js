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

export const adminInstitutionsService = {
  searchInstitutions: (params) => api.get("/institutions", {
      params: {
        name: params.name,
        page: params.page,
        size: params.size,
        sortBy: params.sortBy,
        direction: params.direction,
      },
    }),

  deleteInstitution: (id) => api.delete(`/institutions/${id}`),


  getInstitutionById: (id) => api.get(`/institutions/${id}`),

    createInstitution: (formData) =>
      api.post("/institutions/createInstitution", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      }),

  editInstitution: (id, formData) =>
    api.patch(`/institutions/editInstitution/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    }),

  getAllInstitutions: () => api.get(`/allInstitutions`)
};

export default adminInstitutionsService;