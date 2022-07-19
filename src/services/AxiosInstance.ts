import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useAuthStore } from '../stores/auth';

let options: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosInstance: AxiosInstance = axios.create(options);

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  const authStore = useAuthStore();
  if (config && config.headers) {
    config.headers.Authorization =  authStore.token ? `Bearer ${authStore.token}` : '';
  }
  return config;
});

export default axiosInstance;
