import { apiInstance } from "@shared/api/base";
import type { GetOrganizationsResponse } from "@entities/organizations/config/type";

export const getOrganizationsForUser = async () => {
  const response = await apiInstance.get<GetOrganizationsResponse>('/api/organizations/');
  return response.data;
}