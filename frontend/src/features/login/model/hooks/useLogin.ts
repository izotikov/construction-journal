import { useMutation } from '@tanstack/react-query';
import { loginApi } from '@features/login/api/login.api';
import { useAuthenticate } from '@features/login/model/hooks/useAuthenticate';

export const useLogin = () => {
  const authenticate = useAuthenticate();

  return useMutation({
    mutationFn: loginApi.login,
    onSuccess: async (data) => {
      await authenticate(data);
    },
  })
}