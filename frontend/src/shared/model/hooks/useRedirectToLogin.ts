import { useNavigate } from "@tanstack/react-router";

export const useRedirectToLogin = () => {

  const navigate = useNavigate();

  const redirectToLogin = () => {
     navigate({ to: '/login' });
   }
 
   return { redirectToLogin };
};