import jwt from 'jsonwebtoken';

export const generateToken = (email: string) => {
  const date = new Date();
  date.setDate(date.getDate() + 7);

  return jwt.sign({ email, expiration: date }, process.env.JWT_SECRET!);
};

export const validateToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};
