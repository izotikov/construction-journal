import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@entities/auth/useAuthStore";
import { logoutServer } from "@features/logout/services/logout";
import { useUserStore } from "@entities/user/model/useUserStore";
import { ClientError } from "@shared/api/errors/errors";

export const useLogout = () => {

  const clearAuth = useAuthStore((state) => state.clearAuth);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const logout = async () => {
    if (!user) {
      throw new ClientError('Данные о пользователе отсутствуют');
    }
    await logoutServer(user);
    clearAuth();
    navigate({ to: '/login' });
  }

  return { logout };
}