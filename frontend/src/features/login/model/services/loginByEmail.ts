
import type { LoginDto, LoginResponse } from "@features/login/config/type";
import { apiInstance } from "@shared/api/base";
import { handleApiError } from "@shared/api/errors/handleApiError";

export async function loginByEmail(data: LoginDto) {
  try {
    const response = await apiInstance.post<LoginResponse>('/api/auth/login', data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}