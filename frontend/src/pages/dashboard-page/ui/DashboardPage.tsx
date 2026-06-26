import { useAuthStore } from "@entities/auth/useAuthStore";
import { useLogout } from "@features/logout/model/hooks/useLogout";
import { InputField } from "@shared/ui/input-field/InputField";
import { Button } from "@shared/ui/shadcn/button/Button";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export const DashboardPage = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { logout } = useLogout();
  const [number, setNumber] = useState(0);
  const [calculatedNumber, setCalculatedNumber] = useState(0);
  return (
    <div>
      <div>DashboardPage</div>
      
      {isAuthenticated ? (
        <>
          <Button variant='form' className="cursor-pointer" onClick={logout}>Выйти</Button>
          <Link to="/profile">Open profile</Link>
        </>
       
      ) : (
        <Link to="/login">Войти</Link>
        
      )}
    </div>
    
  )
}