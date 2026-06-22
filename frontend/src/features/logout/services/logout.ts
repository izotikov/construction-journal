import { User } from "@entities/user/config/type";
import { apiInstance } from "@shared/api/base";
import { handleApiError } from "@shared/api/errors/handleApiError";

export async function logoutServer(user: User) {
  try {
    return await apiInstance.post('/api/auth/logout', user);
  } catch (error) {
    handleApiError(error);
  }
}