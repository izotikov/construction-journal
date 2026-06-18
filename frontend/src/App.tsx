import { useAuthStore } from "@entities/auth/useAuthStore";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from './routeTree.gen';

const router = createRouter({ 
  routeTree, 
  context: {
    isAuthenticated: undefined!,
  }, 
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  return <RouterProvider router={router} context={{ isAuthenticated }} />
}
