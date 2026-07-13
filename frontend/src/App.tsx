import { useAuthStore } from "@entities/auth/useAuthStore";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from './routeTree.gen';
import { AuthProvider } from "@app/providers/AuthProvider";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@app/providers/queryClient";

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
  const isInitialized = useAuthStore(state => state.isInitialized);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <RouterProvider
      router={router}
      context={{ isAuthenticated }}
    />
  );
};

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterWrapper />
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  );
}
