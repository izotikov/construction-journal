import { useNavigate } from "@tanstack/react-router";

export const useRegistrationRedirect = () => {

  const navigate = useNavigate();

  const redirectToLogin = () => {
     navigate({ to: '/login' });
   }
 
   return { redirectToLogin };
};