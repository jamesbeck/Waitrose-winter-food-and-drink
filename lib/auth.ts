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

export const getLoggedInEmail = (): string | null => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  if (!token || !token.value) {
    return null;
  }

  try {
    const decoded = validateToken(token.value);

    if (typeof decoded !== 'object' || !decoded.email) {
      return null;
    }

    return decoded.email;
  } catch (error) {
    console.error(error);

    return null;
  }
};
