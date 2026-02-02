import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/manager/institutions';
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

export const managerInstitutionAndBoxService = {


  searchBoxes: (institutionId, params) => api.get(`/${institutionId}/boxes`, {
      params: {
        name: params.name,
        page: params.page,
        size: params.size,
        sortBy: params.sortBy,
        direction: params.direction,
      },
    }),

  getMyInstitutions: (params) => api.get("/manager/institutions", {
    params: {
      name: params.name,
      page: params.page,
      size: params.size,
      sortBy: params.sortBy,
      direction: params.direction,
    },
  }),

  getInstitutionById: (institutionId) => api.get(`/${institutionId}`),

  deleteInstitutionById: (institutionId) => api.delete(`/${institutionId}`),


  createBox: (institutionId, payload) => api.post(`/${institutionId}/createBox`, payload),

  editBox: (institutionId, boxId, payload) => api.post(`/${institutionId}/editBox/${boxId}`, payload),

  getBoxById: (institutionId, boxId) => api.get(`/${institutionId}/boxes/${boxId}`),

  deleteBoxById: (institutionId, boxId) => api.delete(`/${institutionId}/boxes/${boxId}`),
};


export default managerInstitutionAndBoxService;