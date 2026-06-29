import { apiInstance } from "@shared/api/base";
import { GetMeResponse } from "@entities/user/config/type";

export const getMe = async () => {
  const response = await apiInstance.get<GetMeResponse>('/api/auth/me');
  return response.data;
}