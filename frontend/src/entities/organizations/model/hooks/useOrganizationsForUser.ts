import { getOrganizationsForUser } from "@entities/organizations/api/getOrganizationsForUser";
import { useQuery } from "@tanstack/react-query";

export const useOrganizationsForUser = () => {
  return useQuery({
    queryKey: ['organizationsForUser'],
    queryFn: getOrganizationsForUser,
    select: (data) => data.organizations,
    retry: false,
  });
};