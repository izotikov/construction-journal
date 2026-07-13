import { ResetPassword } from '@pages/reset-password/ui/ResetPassword';
import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';

export const Route = createFileRoute('/reset-password')({
  validateSearch: z.object({
    token: z.string(),
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <ResetPassword />
}
