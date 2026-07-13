import { useAuthStore } from "@entities/auth/useAuthStore";
import { useMe } from "@entities/user/model/hooks/useMe";
import { useUserStore } from "@entities/user/model/useUserStore";
import { ReactNode, useEffect } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    setAuthenticated,
    clearAuth,
    setInitialized,
  } = useAuthStore();
  const { status } = useMe();

  useEffect(() => {
    if (status === 'success') {
      setAuthenticated(true);
      setInitialized(true);
    }

    if (status === 'error') {
      clearAuth();
      setInitialized(true);
    }
  }, [status]);

  if (status === 'pending') return <div>Loading...</div>;

  return children;
};