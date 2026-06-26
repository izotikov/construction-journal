import { useAuthStore } from "@entities/auth/useAuthStore";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from './routeTree.gen';
import { AuthProvider } from "@app/providers/AuthProvider";
import { ToastContainer } from "react-toastify";

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

const RouterWrapper = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <RouterProvider
      router={router}
      context={{ isAuthenticated }}
    />
  );
};

export function App() {
  return (
    <AuthProvider>
      <RouterWrapper />
      <ToastContainer />
    </AuthProvider>
  );
}
