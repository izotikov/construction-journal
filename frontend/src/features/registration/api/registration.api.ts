import { apiInstance } from '@shared/api/base';
import type { RegisterDto } from '@features/registration/config/type';

export const registerApi = {
  register: (data: RegisterDto) =>
    apiInstance.post('/api/auth/register', data, {skipAuthRefresh: true}).then(response => response.data),
}