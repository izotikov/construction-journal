import { VerifyEmail } from '@pages/verify-result/ui/VerifyResultPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/verify-result')({
  component: RouteComponent,
})

function RouteComponent() {
  return <VerifyEmail />
}
