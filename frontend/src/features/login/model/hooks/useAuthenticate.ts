import { useNavigate, useRouter } from "@tanstack/react-router";
import {Route as LoginRoute} from '@routes/login';
import { useAuthStore } from "@entities/auth/useAuthStore";
import { useUserStore } from "@entities/user/model/useUserStore";
import { LoginResponse } from "@features/login/config/type";

export const useAuthenticate = () => {

  const navigate = useNavigate();
  const { redirect } = LoginRoute.useSearch();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  const authenticate = async (data: LoginResponse) => {
    setUser(data.result.user);
    setAuthenticated(true);
    setAccessToken(data.result.accessToken);
    await router.invalidate();
    navigate({ to: redirect ?? '/' });
  };

  return authenticate;
}