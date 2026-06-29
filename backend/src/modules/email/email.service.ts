import { env } from "../../config/env";
import { resend } from "../../shared/resend/resend";


export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${env.API_URL}/api/auth/verifyEmail?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: 'Budlo <onboarding@resend.dev>',
    to: email,
    subject: 'Подтвердите email',
    html: `<p>Нажмите <a href="${verifyUrl}">сюда</a> для подтверждения. Ссылка действует 24 часа.</p>`,
  });

  if (error) {
    throw new Error(`Failed to send verification email: ${error.message}`);
  }

  return data;
}

  export async function sendPasswordResetEmail(email: string, token: string) {
    const url = `${env.CLIENT_URL}/reset-password?token=${token}`

    const { data, error } = await resend.emails.send({
      from: 'Budlo <onboarding@resend.dev>',
      to: email,
      subject: 'Сброс пароля',
      html: `<p>Нажмите <a href="${url}">сюда</a> для сброса пароля. Ссылка действует 1 час.</p>`,
    });

    if (error) {
      throw new Error(`Failed to send verification email: ${error.message}`);
    }

    return data;
  }