import { useResetPasswordForm } from "@features/reset-password/model/hooks/useResetPasswordForm";
import type { ResetPasswordFormData } from "@features/reset-password/schema/resetPasswordFormSchema";
import { AppearanceAnimation } from "@shared/ui/appearance-animation/AppearanceAnimation";
import { ConfirmField } from "@shared/ui/confirm-field/ConfirmField";
import { ErrorField } from "@shared/ui/error-field/ErrorField";
import { FormHeader } from "@shared/ui/form-header/FormHeader";
import FormLayout from "@shared/ui/form-layout/FormLayout";
import { InlineLink } from "@shared/ui/inline-link/InlineLink";
import { PasswordField } from "@shared/ui/password-field/PasswordField";
import { Button } from "@shared/ui/shadcn/button/Button";
import { FieldGroup, FieldLegend } from "@shared/ui/shadcn/field/Field";
import { PersonIcon } from "@shared/ui/svg-react-icons/person-icon/PersonIcon";
import { FormProvider } from "react-hook-form";

type Props = {
  token: string;
}

export function ResetPasswordForm({token}: Props) {

  const {
      methods,
      handleSubmit,
      onSubmit,
      isPending,
      rootError
    } = useResetPasswordForm(token);
  
    const {
      formState: { errors },
    } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-full max-w-md"
        noValidate
        autoComplete="off"
      >
        <FormHeader
          icon={
            <PersonIcon
              width={24}
              height={24}
              className="text-text-primary"
            />
          }
          title="Добро пожаловать"
          description="Войдите в свой аккаунт"
          className="mb-3"
        />

        <FormLayout className="p-3">
          <FieldLegend className="sr-only">
            Сброс пароля
          </FieldLegend>

          <FieldGroup className="space-y-4">
            <PasswordField<ResetPasswordFormData> 
            label="Придумайте новый пароль" 
            placeholder="Введите новый пароль"
            autoComplete="new-password"
            />
            <ConfirmField<ResetPasswordFormData>
              fieldName="confirmPassword"
              label="Подтвердите пароль"
              type="password"
              placeholder="Подтвердите новый пароль"
            />
          </FieldGroup>

          <AppearanceAnimation show={!!errors.root}>
            <ErrorField errorDescription={rootError} />
          </AppearanceAnimation>

          <Button
            type="submit"
            variant="form"
            size="lg"
            disabled={isPending}
          >
            {isPending ? 'Отправляю...' : 'Отправить'}
          </Button>
        </FormLayout>

        <InlineLink
          text="Вернуться на"
          linkText="страницу логина"
          to="/login"
          className="mt-4"
        />
      </form>
    </FormProvider>
  )
}
