import { apiInstance } from "@shared/api/base";
import { User } from "@entities/user/config/type";

export const getMe = async () => {
  const response = await apiInstance.get<User>('/api/auth/me');
  return response.data;
}