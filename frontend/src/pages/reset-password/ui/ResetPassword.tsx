import { ResetPasswordForm } from "@features/reset-password/ui/ResetPasswordForm";
import BackgroundDecoration from "@shared/ui/background-decoration/BackgroundDecoration";
import { FullscreenCenterLayout } from "@shared/ui/fullscreen-center-layout/FullscreenCenterLayout";
import { useSearch } from "@tanstack/react-router";

export function ResetPassword() {

  const search = useSearch({ from: '/reset-password' });
  const token = search.token;

  return (
    <FullscreenCenterLayout>
      <BackgroundDecoration />
      <ResetPasswordForm token={token}/>
    </FullscreenCenterLayout>
  )
}