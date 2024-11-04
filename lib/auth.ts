'use server';

import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { generateToken, validateToken } from './auth/tokens';
import { sendLoginLinkEmail } from './emails';

export const sendLoginLink = (email: string) => {
  const token = generateToken(email);

  return sendLoginLinkEmail(email, token);
};

export const logIn = (token: string): void => {
  jwt.verify(token, process.env.JWT_SECRET!);

  const cookieStore = cookies();
  cookieStore.set('token', token);
};

export const logOut = () => {
  const cookieStore = cookies();

  cookieStore.delete('token');
};

export const getLoggedInEmail = (): Promise<string | null> => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  if (!token || !token.value) {
    return Promise.resolve(null);
  }

  try {
    const decoded = validateToken(token.value);

    if (typeof decoded !== 'object' || !decoded.email) {
      return Promise.resolve(null);
    }

    return decoded.email;
  } catch (error) {
    console.error(error);

    return Promise.resolve(null);
  }
};

export const isWelcomed = async () => {
  const cookieStore = cookies();
  const welcomed = cookieStore.get('welcomed');

  return welcomed !== undefined && welcomed.value === 'true';
};

export const markWelcomed = () => {
  const cookieStore = cookies();
  cookieStore.set('welcomed', 'true');
};
