import type { GetProjectsResponse } from "@entities/projects/config/type";
import { apiInstance } from "@shared/api/base";


export const getProjectsForUser = async () => {
  const response = await apiInstance.get<GetProjectsResponse>('/api/projects/');
  return response.data;
}