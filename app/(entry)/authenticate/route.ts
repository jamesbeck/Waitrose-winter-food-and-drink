import { logIn } from '@/lib/auth';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const token = searchParams.get('token');

  if (!token) {
    return redirect('/authenticate/error');
  }

  try {
    logIn(token);
  } catch (error) {
    console.error(error);

    return redirect('/authenticate/error');
  }

  return redirect('/home');
}
