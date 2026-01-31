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

export const adminUsersService = {
//   searchInstitutions: (params) => api.get("/institutions", {
//       params: {
//         name: params.name,
//         page: params.page,
//         size: params.size,
//         sortBy: params.sortBy,
//         direction: params.direction,
//       },
//     }),

//   deleteInstitution: (id) => api.delete(`/institutions/${id}`),

//   editCity: (id, data) =>
//     api.patch(`/institutions/editInstitution/${id}`, {
//         name: data.name,
//         cityId: data.cityId,
//         address: data.address,
//         rating: data.rating,
//         contactNumber: data.contactNumber,
//         categories: data.categories,
//         boxes: data.boxes,
//   }),


//   getInstitutionById: (id) => api.get(`/institutions/${id}`),

//   createInstitution: (data) => api.post(`/institutions/createInstitution`, {
//     name: data.name,
//     cityId: data.cityId,
//     address: data.address,
//     rating: data.rating,
//     contactNumber: data.contactNumber,
//     categories: data.categories,
//     boxes: data.boxes,
//     logoImage: data.logoImage
//   }),

  getAllUsers: () => api.get(`/getAllUsers`)
};

export default adminUsersService;