import type { RegisterDto } from "@features/registration/config/type";
import { apiInstance } from "@shared/api/base";
import { handleApiError } from "@shared/api/errors/handleApiError";

export async function registerByEmail(data: RegisterDto) {
  console.log(data);
  try {
    return await apiInstance.post('/api/auth/register/', data);
  } catch (error) {
    handleApiError(error);
  }
}