import { ENV } from '@shared/config/env';
import axios from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuthRefresh?: boolean;
  }
}

export const apiInstance = axios.create({
  baseURL: ENV.API_URL,
  withCredentials: true,
});