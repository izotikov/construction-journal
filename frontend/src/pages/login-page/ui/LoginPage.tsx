import BackgroundDecoration from "@shared/ui/background-decoration/BackgroundDecoration";
import { FullscreenCenterLayout } from "@shared/ui/fullscreen-center-layout/FullscreenCenterLayout";
import { LoginForm } from "@features/login/ui/LoginForm";

export function LoginPage() {
  return (
    <FullscreenCenterLayout>
      <BackgroundDecoration />
      <LoginForm />
    </FullscreenCenterLayout>
  );
}