import { LogInEmail } from '@/emails/LogIn';
import { render } from '@react-email/components';
import type { MailDataRequired } from '@sendgrid/mail';
import { mail } from './sendgrid';

export const sendLoginLinkEmail = async (email: string, token: string) => {
  const message: MailDataRequired = {
    to: process.env.SENDGRID_TO_EMAIL || email,
    from: process.env.SENDGRID_FROM_EMAIL!,
    subject: 'Log-in to your account',
    text: `Click the following link to log in: ${process.env.NEXT_PUBLIC_URL}/authenticate?token=${token}`,
    html: await render(
      <LogInEmail
        magicLink={`${process.env.NEXT_PUBLIC_URL}/authenticate?token=${token}`}
      />
    ),
  };

  await mail.send(message);
};
