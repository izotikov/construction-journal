import { useNavigate, useRouter } from "@tanstack/react-router";
import {Route as LoginRoute} from '@routes/login';
import { useAuthStore } from "@entities/auth/useAuthStore";

export const useAuthenticate = () => {

  const navigate = useNavigate();
    const { redirect } = LoginRoute.useSearch();
    const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
    const router = useRouter();

    const authenticate = async () => {
      setAuthenticated(true);
      await router.invalidate();
      navigate({ to: redirect ?? '/' });
    }

    return authenticate;
}