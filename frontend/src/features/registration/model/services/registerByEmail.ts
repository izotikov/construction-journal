import type { RegisterDto } from "@features/registration/config/type";
import { apiInstance } from "@shared/api/base";
import { handleApiError } from "@shared/api/errors/handleApiError";

export async function registerByEmail(data: RegisterDto) {
  try {
    return await apiInstance.post('/api/users/', data);
  } catch (error) {
    handleApiError(error);
  }
}