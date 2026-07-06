import { useMutation } from '@tanstack/react-query';
import { registerApi } from '@features/registration/api/registration.api';
import { toast } from 'react-toastify';
import { useRedirectToLogin } from '@shared/model/hooks/useRedirectToLogin';

export const useRegister = () => {

  const { redirectToLogin } = useRedirectToLogin();
  const notify = () => toast.info('Проверьте почту для завершения регистрации', {
    position: 'bottom-right',
  });

  const redirectAndNotify = () => {
    notify();
    redirectToLogin();
  }

  return useMutation({
    mutationFn: registerApi.register,
    onSuccess: () => {
      redirectAndNotify();
    },
  })
}