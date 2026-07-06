import { VerifyEmail } from '@pages/verify-result/ui/VerifyResultPage';
import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';

export const Route = createFileRoute('/verify-result')({
  validateSearch: z.object({
    status: z.string().optional(),
    message: z.string().optional()
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <VerifyEmail />
}
