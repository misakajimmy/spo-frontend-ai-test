import axios from 'axios';
import type { AxiosInstance } from 'axios';

const BASE_URL = 'http://localhost:3001';

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// 请求拦截器（可扩展）
apiClient.interceptors.request.use(
  config => {
    // TODO: add auth token if needed
    return config;
  },
  error => Promise.reject(error),
);

// 响应拦截器
apiClient.interceptors.response.use(
  response => {
    const { code, message } = response.data;
    if (code !== 0) {
      // 统一错误处理
      return Promise.reject(new Error(message || 'Unknown error'));
    }
    return response.data;
  },
  error => {
    // 网络或服务器错误
    return Promise.reject(error);
  },
);
