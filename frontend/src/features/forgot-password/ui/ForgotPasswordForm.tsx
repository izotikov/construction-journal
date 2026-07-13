import { FormHeader } from "@shared/ui/form-header/FormHeader";
import FormLayout from "@shared/ui/form-layout/FormLayout";
import { InlineLink } from "@shared/ui/inline-link/InlineLink";
import { Button } from "@shared/ui/shadcn/button/Button";
import { FieldGroup, FieldLegend } from "@shared/ui/shadcn/field/Field";
import { PersonIcon } from "@shared/ui/svg-react-icons/person-icon/PersonIcon";
import { EmailField } from "@shared/ui/email-field/EmailField";
import { FormProvider } from "react-hook-form";
import { AppearanceAnimation } from "@shared/ui/appearance-animation/AppearanceAnimation";
import { ErrorField } from "@shared/ui/error-field/ErrorField";
import { ForgotPasswordFormData } from "@features/forgot-password/model/schema/forgotPasswordFormSchema";
import { TextParagraph } from "@shared/ui/text-paragraph/TextParagraph";
import { useForgotPasswordForm } from "@features/forgot-password/model/hooks/useForgotPasswordForm";

export const ForgotPasswordForm = () => {

  const {
    methods,
    handleSubmit,
    onSubmit,
    isPending,
    rootError
  } = useForgotPasswordForm();

  const {
    formState: { errors },
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
            Сброс пароля
          </FieldLegend>

          <TextParagraph className="text-text-primary text-center">
            Введите адрес электронной почты, который вы указывали при регистрации, 
            и мы вышлем на него ссылку для сброса пароля.
          </TextParagraph>

          <FieldGroup className="space-y-4">
            <EmailField<ForgotPasswordFormData> />
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