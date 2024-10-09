import { getCurrentUser } from '@/lib/data/user';
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/log-in');
  }

  redirect('/home');
}
