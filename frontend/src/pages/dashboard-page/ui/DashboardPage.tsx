import { useAuthStore } from "@entities/auth/useAuthStore";
import { useLogout } from "@features/logout/model/hooks/useLogout";
import { Card } from "@pages/dashboard-page/ui/card/ui/Card";
import { Button } from "@shared/ui/shadcn/button/Button";
import { Link } from "@tanstack/react-router";

const mockData = {
  author: {
    avatarUrl: null,
    username: "agromov"
  },
  executor: {
    avatarUrl: null,
    username: "dkozlov"
  },
  card: {
    title: 'Армирование фундамента — секция B',
    description: 'Укладка арматурного каркаса по проектным чертежам. Контроль диаметра прутьев и шага вязки согласно СП 63.13330.',
    creationDate: ''
  }
}

export const DashboardPage = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { mutateAsync: logout, isPending, error } = useLogout();

  return (
    <div>
      <div>DashboardPage</div>
      <Card author={mockData.author} executor={mockData.executor} card={mockData.card}/>
  
      {isAuthenticated ? (
        <>
          <Button variant='form' className="cursor-pointer" onClick={() => logout()}>
            {isPending ? "Выхожу..." : "Выйти"}
            </Button>
          <Link to="/profile">Open profile</Link>
        </>
       
      ) : (
        <Link to="/login">Войти</Link>
        
      )}
    </div>
  )
}