import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const logIn = (token: string): void => {
  jwt.verify(token, process.env.JWT_SECRET!);

  const cookieStore = cookies();
  cookieStore.set('token', token);
};

export const getLoggedInEmail = (): string | null => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  if (!token || !token.value) {
    return null;
  }

  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET!);

    if (typeof decoded !== 'object' || !decoded.email) {
      return null;
    }

    return decoded.email;
  } catch (error) {
    console.error(error);

    return null;
  }
};
