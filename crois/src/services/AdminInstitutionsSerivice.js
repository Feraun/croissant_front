import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/admin/institutions';
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
  searchInstitutions: (params) => api.get("", {
      params: {
        name: params.name,
        page: params.page,
        size: params.size,
        sortBy: params.sortBy,
        direction: params.direction,
      },
    }),

  deleteInstitution: (id) => api.delete(`/${id}`),


  getInstitutionById: (id) => api.get(`/${id}`),

  createInstitution: (formData) =>
    api.post("/createInstitution", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    }),

  editInstitution: (id, formData) =>
    api.patch(`/editInstitution${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    }),

  getAllInstitutions: () => api.get(`/getAll`)
};

export default adminInstitutionsService;