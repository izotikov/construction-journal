import { useMutation } from '@tanstack/react-query';
import { registerApi } from '@features/registration/api/registration.api';
import { useRegistrationRedirect } from '@features/registration/model/hooks/useRegistrationRedirect';
import { toast } from 'react-toastify';

export const useRegister = () => {

  const { redirectToLogin } = useRegistrationRedirect();
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