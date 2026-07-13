import { LoginPage } from '@pages/login-page/ui/LoginPage';
import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <LoginPage />
}
