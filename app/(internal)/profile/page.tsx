import { BackIcon } from '@/components/icons/backIcon';
import { UserIcon } from '@/components/icons/userIcon';
import { Container } from '@/components/layout/container';
import { Content } from '@/components/layout/content';
import { Secret } from '@/components/typography/secret';
import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/data/user';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { LogOutButton } from './logOutButton';

export default async function Profile() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/log-in');
  }

  return (
    <Content>
      <div className="text-left mb-12">
        <Link href="/home">
          <Button variant="ghost" size="icon">
            <BackIcon />
          </Button>
        </Link>
      </div>

      <Container>
        <div className="rounded-full size-24 bg-waitrose-lime/10 p-3 mx-auto">
          <UserIcon className="w-full h-full" />
        </div>

        <dl className="space-y-3">
          <dt>First Name</dt>
          <dd className="font-light">{user.first_name}</dd>

          <dt>Last Name</dt>
          <dd className="font-light">{user.last_name}</dd>

          <dt>Email Address</dt>
          <dd className="font-light">{user.email}</dd>

          {user.loyalty_card_number && (
            <>
              <dt>MyWaitrose Card Number</dt>
              <dd className="font-light">
                <Secret value={user.loyalty_card_number} />
              </dd>
            </>
          )}
        </dl>
      </Container>

      <LogOutButton />
    </Content>
  );
}
