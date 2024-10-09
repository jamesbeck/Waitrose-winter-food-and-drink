import { UserIcon } from '@/components/icons/userIcon';
import { Content } from '@/components/layout/content';
import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/data/user';
import { redirect } from 'next/navigation';

export default async function Profile() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/log-in');
  }

  return (
    <Content>
      <h1>Logged in as {user.email}</h1>

      <div className="rounded-full size-16 bg-waitrose-lime/10 p-3">
        <UserIcon className="w-full h-full" />
      </div>

      <Button>Log out</Button>
    </Content>
  );
}
