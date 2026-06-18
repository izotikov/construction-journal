import { DashboardPage } from '@pages/dashboard-page/ui/DashboardPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DashboardPage />
}
