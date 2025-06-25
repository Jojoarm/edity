import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Don't log 401s - they're expected when not authenticated
      return Promise.reject(error);
    }
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;
