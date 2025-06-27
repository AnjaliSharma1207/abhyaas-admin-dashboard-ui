import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5051/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optionally handle global errors here
    if (error.response && error.response.status === 401) {
      // Optionally redirect to login or clear auth
      // localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api; 