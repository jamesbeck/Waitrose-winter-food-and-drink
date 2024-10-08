import { Container } from '@/components/layout/container';
import { Content } from '@/components/layout/content';
import { H1 } from '@/components/typography/h1';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Register() {
  return (
    <Content>
      <Container width="wide">
        <H1>Log-in Error</H1>
      </Container>

      <Alert variant="destructive">
        There was an error while logging you in, please try again.
      </Alert>

      <div>
        <Link href="/log-in">
          <Button>Return to log-in</Button>
        </Link>
      </div>
    </Content>
  );
}
