import { apiInstance } from '@shared/api/base';
import type { User } from '@entities/user/config/type';

export const userApi = {
  logout: (user: User) =>
    apiInstance.post('/api/auth/logout', user).then(response => response.data),
};