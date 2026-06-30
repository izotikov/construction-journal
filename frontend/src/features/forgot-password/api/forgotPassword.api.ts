import { apiInstance } from '@shared/api/base'
import { ForgotPasswordDto, ForgotPasswordResponse } from '@features/forgot-password/config/type';

export const forgotPasswordApi = {
  forgotPassword: (data: ForgotPasswordDto) =>
    apiInstance.post<ForgotPasswordResponse>('/api/auth/forgot-password', data).then(response => response.data),
};