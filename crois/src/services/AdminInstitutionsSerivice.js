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
      page: params.page,
      size: params.size,
      name: params.name,
      sort: params.sort}
    }),

  deleteInstitution: (id) => api.delete(`/${id}`),


  getInstitutionById: (id) => api.get(`/${id}`),

  createInstitution: (formData) =>
<<<<<<< HEAD
    api.post("/institutions/createInstitution", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    }),

  editInstitution: (id, formData) =>
    api.patch(`/institutions/editInstitution/${id}`, formData, {
=======
    api.post("/createInstitution", formData, {
>>>>>>> b2634b31e0ced31c2b3ec78aa2b52b3048b54a79
      headers: { "Content-Type": "multipart/form-data" }
    }),

  editInstitution: (id, formData) =>
    api.patch(`/editInstitution${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    }),

  getAllInstitutions: () => api.get(`/getAll`)
};

export default adminInstitutionsService;