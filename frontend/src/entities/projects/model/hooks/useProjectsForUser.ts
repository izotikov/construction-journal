import { getProjectsForUser } from "@entities/projects/api/getProjectsForUser";
import { useQuery } from "@tanstack/react-query";

export const useProjectsForUser = () => {
  return useQuery({
    queryKey: ['projectsForUser'],
    queryFn: getProjectsForUser,
    select: (data) => data.projects,
    retry: false,
  });
};