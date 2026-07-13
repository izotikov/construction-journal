import type { ResetPasswordDto, ResetPasswordResponse } from '@features/reset-password/config/type';
import { apiInstance } from '@shared/api/base';

export const resetPasswordApi = {
  resetPassword: ({data, token}: {data: ResetPasswordDto, token: string}) =>
    apiInstance.post<ResetPasswordResponse>(`/api/auth/reset-password?token=${token}`, data, {skipAuthRefresh: true}).then(response => response.data),
};