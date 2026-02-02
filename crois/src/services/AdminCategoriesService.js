import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/admin/categoriesOfInstitution';
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

export const adminCategoriesOfInstitutionService = {
  searchCategories: (params) => api.get("", {
      params: {
        name: params.name,
        page: params.page,
        size: params.size,
        sortBy: params.sortBy,
        direction: params.direction,
      },
    }),

  deleteCategory: (id) => api.delete(`/${id}`),

  editCategory: (id, data) =>
    api.patch(`/editCategory/${id}`, {
    name: data.name,
    description: data.description,
  }),


  getCategoryById: (id) => api.get(`/${id}`),

  createCategory: (data) => api.post(`/createCategory`, {
    name: data.name,
    description: data.description
  }),

  getAllCategories: () => api.get(`/getAll`)
};

export default adminCategoriesOfInstitutionService;