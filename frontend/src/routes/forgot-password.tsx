import { ForgotPassword } from '@pages/forgot-password/ui/ForgotPassword'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/forgot-password')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ForgotPassword />
}
