import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { apiInstance } from '@shared/api/base';
import { useAuthStore } from '@entities/auth/useAuthStore';
import { useUserStore } from '@entities/user/model/useUserStore';
import { handleApiError } from '@shared/api/errors/handleApiError';

apiInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let queue: Array<{ resolve: (t: string) => void; reject: (e: unknown) => void }> = [];

apiInstance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean, skipAuthRefresh?: boolean; };

    if (error.response?.status === 401 && !original._retry && !original.skipAuthRefresh && !original.url?.includes('/auth/refresh-token')) {

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        }).then((token) => {
          original.headers['Authorization'] = `Bearer ${token}`;
          return apiInstance(original);
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const { data } = await apiInstance.post('/api/auth/refresh-token');
        const newToken = data.accessToken;
        useAuthStore.getState().setAccessToken(
          newToken
        );

        queue.forEach(({ resolve }) => resolve(newToken));
        queue = [];

        original.headers['Authorization'] = `Bearer ${newToken}`;
        return apiInstance(original);
      } catch (refreshError) {
        queue.forEach(({ reject }) => reject(refreshError));
        queue = [];
        useAuthStore.getState().clearAuth();
        useUserStore.getState().clearUser();
        return handleApiError(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return handleApiError(error);
  }
);