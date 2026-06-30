import { apiInstance } from '@shared/api/base';
import type { RegisterDto } from '@features/registration/config/type';

export const registerApi = {
  register: (data: RegisterDto) =>
    apiInstance.post('/api/auth/register', data).then(response => response.data),
}