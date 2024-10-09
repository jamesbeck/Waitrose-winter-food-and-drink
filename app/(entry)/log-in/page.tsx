import { Container } from '@/components/layout/container';
import { Content } from '@/components/layout/content';
import { H1 } from '@/components/typography/h1';
import { Small } from '@/components/typography/small';
import { Button } from '@/components/ui/button';
import { getLoggedInEmail } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { LogInForm } from './logInForm';

export default function LogIn() {
  const email = getLoggedInEmail();

  if (email) {
    redirect('/home');
  }

  return (
    <Content>
      <Container width="wide">
        <H1>Please log-in for the full experience</H1>
      </Container>

      <LogInForm />

      <div className="space-y-6 pt-6">
        <Container width="wide">
          <Small>
            If you&apos;d rather just look around, tap below. You won&apos;t be
            able to take part in our hunts, competitions, or make your own
            schedules/bookings
          </Small>
        </Container>

        <Link href="/home">
          <Button variant="outline">Limited Experience</Button>
        </Link>
      </div>
    </Content>
  );
}
