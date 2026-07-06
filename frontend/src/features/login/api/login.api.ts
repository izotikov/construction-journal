import { apiInstance } from '@shared/api/base'
import type { LoginDto, LoginResponse } from '@features/login/config/type';

export const loginApi = {
  login: (data: LoginDto) =>
    apiInstance.post<LoginResponse>('/api/auth/login', data, {skipAuthRefresh: true}).then(response => response.data),
};