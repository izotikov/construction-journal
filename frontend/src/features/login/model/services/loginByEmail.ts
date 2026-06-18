import type { LoginDto } from "@features/login/config/type";
import { apiInstance } from "@shared/api/base";
import { handleApiError } from "@shared/api/errors/handleApiError";

export async function loginByEmail(data: LoginDto) {
  try {
    return await apiInstance.post('/api/auth/login', data);
  } catch (error) {
    handleApiError(error);
  }
}