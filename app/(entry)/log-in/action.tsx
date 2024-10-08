'use server';

import { LogInEmail } from '@/emails/LogIn';
import { db } from '@/lib/knex';
import { mail } from '@/lib/sendgrid';
import { render } from '@react-email/components';
import type { MailDataRequired } from '@sendgrid/mail';
import jwt from 'jsonwebtoken';
import type { FormSchema } from './schema';

type Result = { status: 'success' } | { status: 'error'; error: string };

export const login = async (values: FormSchema): Promise<Result> => {
  const existing = await db.table('users').where('email', values.email).first();

  if (!existing) {
    return {
      status: 'error',
      error:
        'There doesn’t seem to be a user with that email address. Please try registering for an account',
    };
  }

  const token = generateToken(values.email);

  await db.table('users').where('email', values.email).update({
    login_token: token,
  });

  await sendEmail(values.email, token);

  return {
    status: 'success',
  };
};

const generateToken = (email: string) => {
  const date = new Date();
  date.setHours(date.getHours() + 1);

  return jwt.sign({ email, expiration: date }, process.env.JWT_SECRET!);
};

const sendEmail = async (email: string, token: string) => {
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