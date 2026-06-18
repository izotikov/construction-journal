import { RegisterForm } from "@features/registration/ui/RegisterForm";
import BackgroundDecoration from "@shared/ui/background-decoration/BackgroundDecoration";
import { FullscreenCenterLayout } from "@shared/ui/fullscreen-center-layout/FullscreenCenterLayout";

export function RegistrationPage() {
  return (
    <FullscreenCenterLayout>
          <BackgroundDecoration />
          <RegisterForm />
        </FullscreenCenterLayout>
  )
}