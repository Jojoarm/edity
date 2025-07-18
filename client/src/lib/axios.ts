import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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

export const handleApiError = (error: unknown): void => {
  let message = 'An unexpected error occurred';

  if (axios.isAxiosError(error) && error.response?.data?.message) {
    message = error.response.data.message;
  } else if (error instanceof Error) {
    message = error.message;
  }
  console.log(error);
  throw new Error(message);
};
