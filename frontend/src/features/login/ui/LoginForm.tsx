import { FormHeader } from "@shared/ui/form-header/FormHeader";
import FormLayout from "@shared/ui/form-layout/FormLayout";
import { InlineLink } from "@shared/ui/inline-link/InlineLink";
import { Button } from "@shared/ui/shadcn/button/Button";
import { FieldGroup, FieldLegend } from "@shared/ui/shadcn/field/Field";
import { PersonIcon } from "@shared/ui/svg-react-icons/person-icon/PersonIcon";
import { EmailField } from "@shared/ui/email-field/EmailField";
import { PasswordField } from "@shared/ui/password-field/PasswordField";
import { FormProvider } from "react-hook-form";
import { AppearanceAnimation } from "@shared/ui/appearance-animation/AppearanceAnimation";
import { ErrorField } from "@shared/ui/error-field/ErrorField";
import { useLoginForm } from "@features/login/model/hooks/useLoginForm";
import { LoginFormData } from "@features/login/model/schema/loginFormSchema";

export const LoginForm = () => {

  const {
    methods,
    handleSubmit,
    onSubmit,
    rootError
  } = useLoginForm();

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
            <EmailField<LoginFormData> />
            <PasswordField<LoginFormData> forgotPasswordHref={'#'}/>
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
            Войти
          </Button>
        </FormLayout>

        <InlineLink
          text="Нет аккаунта?"
          linkText="Зарегистрироваться"
          to="/register"
          className="mt-4"
        />
      </form>
    </FormProvider>
  )
}