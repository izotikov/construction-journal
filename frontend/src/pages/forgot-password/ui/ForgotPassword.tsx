import { ForgotPasswordForm } from "@features/forgot-password/ui/ForgotPasswordForm";
import BackgroundDecoration from "@shared/ui/background-decoration/BackgroundDecoration";
import { FullscreenCenterLayout } from "@shared/ui/fullscreen-center-layout/FullscreenCenterLayout";

export function ForgotPassword() {
  return (
    <FullscreenCenterLayout>
          <BackgroundDecoration />
          <ForgotPasswordForm />
        </FullscreenCenterLayout>
  )
}