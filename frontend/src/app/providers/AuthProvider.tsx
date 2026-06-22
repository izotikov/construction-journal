import { useAuthStore } from "@entities/auth/useAuthStore";
import { getMe } from "@entities/user/api/getMe";
import { useUserStore } from "@entities/user/model/useUserStore";
import { ReactNode, useEffect, useState } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setAccessToken, clearAuth, setAuthenticated } = useAuthStore();
  const {setUser} = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // При каждом старте/reload — пробуем восстановить сессию
    getMe()
      .then((user) => {
        const token = useAuthStore.getState().accessToken;
        setUser(user);
        setAuthenticated(true);
        setAccessToken(token);
      })
      .catch(() => {
        clearAuth();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return children;
};