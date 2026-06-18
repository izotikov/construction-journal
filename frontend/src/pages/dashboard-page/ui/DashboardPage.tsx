import { useAuthStore } from "@entities/auth/useAuthStore";
import { useLogout } from "@features/login/model/hooks/useLogout";
import { Button } from "@shared/ui/shadcn/button/Button";
import { Link } from "@tanstack/react-router";

export const DashboardPage = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { logout } = useLogout();
  return (
    <div>
      <div>DashboardPage</div>
      
      {isAuthenticated ? (
        <Button variant='form' className="cursor-pointer" onClick={logout}>Выйти</Button>
      ) : (
        <Link to="/login">Войти</Link>
      )}
    </div>
    
  )
}