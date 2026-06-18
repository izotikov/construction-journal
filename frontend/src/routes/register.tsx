import { RegistrationPage } from '@pages/registration-page/ui/RegistrationPage';
import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';

export const Route = createFileRoute('/register')({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <RegistrationPage />
}
