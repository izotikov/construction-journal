import { useRegisterForm } from "@features/registration/model/hooks/useRegisterForm";
import { PasswordField } from "@shared/ui/password-field/PasswordField";
import { FormProvider } from "react-hook-form";
import { AppearanceAnimation } from "@shared/ui/appearance-animation/AppearanceAnimation";
import { ErrorField } from "@shared/ui/error-field/ErrorField";
import { PersonIcon } from "@shared/ui/svg-react-icons/person-icon/PersonIcon";
import { EmailField } from "@shared/ui/email-field/EmailField";
import { FieldGroup, FieldLegend } from "@shared/ui/shadcn/field/Field";
import { FormHeader } from "@shared/ui/form-header/FormHeader";
import FormLayout from "@shared/ui/form-layout/FormLayout";
import { InlineLink } from "@shared/ui/inline-link/InlineLink";
import { Button } from "@shared/ui/shadcn/button/Button";
import { RegisterFormData } from "@features/registration/model/schema/registerFormSchema";
import { ConfirmField } from "@shared/ui/confirm-field/ConfirmField";
import { UsernameField } from "./UsernameField";


export const RegisterForm = () => {

  const {
    methods,
    handleSubmit,
    onSubmit,
    rootError
  } = useRegisterForm();

  const {
    formState: { isSubmitting, errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-full max-w-md"
        noValidate
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
            Вход в систему
          </FieldLegend>

          <FieldGroup className="space-y-4">
            <UsernameField<RegisterFormData> />
            <EmailField<RegisterFormData> />
            <PasswordField<RegisterFormData> />
            <ConfirmField<RegisterFormData>
              fieldName="confirmPassword"
              label="Подтвердите пароль"
              type="password"
              placeholder="Введите пароль ещё раз"
            />
          </FieldGroup>

          <AppearanceAnimation show={!!errors.root}>
            <ErrorField errorDescription={rootError} />
          </AppearanceAnimation>

          <Button
            type="submit"
            variant="form"
            size="lg"
            disabled={isSubmitting}
          >
            Зарегистрироваться
          </Button>
        </FormLayout>

        <InlineLink
          text="Есть аккаунт?"
          linkText="Войти"
          to="/login"
          className="mt-4"
        />
      </form>
    </FormProvider>
  )
}