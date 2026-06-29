import { getMe } from "@entities/user/api/getMe";
import { useQuery } from "@tanstack/react-query";

export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    select: (data) => data.user,
    retry: false,
  });
};