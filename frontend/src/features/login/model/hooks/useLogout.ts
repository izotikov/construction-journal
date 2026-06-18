import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@entities/auth/useAuthStore";

export const useLogout = () => {

  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const navigate = useNavigate();

  const logout = () => {
    setAuthenticated(false);
    navigate({ to: '/login' });
  }

  return { logout };
}