import { User } from '@entities/user/config/type';
import { apiInstance } from '@shared/api/base';

export const logoutApi = {
  logout: () =>
    apiInstance.post('/api/auth/logout').then(response => response.data),
}