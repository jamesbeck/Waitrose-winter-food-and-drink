'use server';

import { logOut } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const logOutAction = async () => {
  logOut();

  redirect('/log-in');
};
