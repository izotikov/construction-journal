import { ProfilePage } from '@pages/profile-page/ui/ProfilePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ProfilePage />
}
