import { useAuthStore } from "@entities/auth/useAuthStore";
import { useUserStore } from "@entities/user/model/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { logoutApi } from "@features/logout/api/logout.api";
import { useNavigate } from "@tanstack/react-router";

export const useLogout = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const clearUser = useUserStore((state) => state.clearUser);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logoutApi.logout,
    onSuccess: () => {
      clearAuth();
      clearUser();
      navigate({to: '/login'});
    },
  })
}