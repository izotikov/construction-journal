import { ENV } from '@shared/config/env';
import axios from 'axios';

export const apiInstance = axios.create({
  baseURL: ENV.API_URL,
  withCredentials: true,
});