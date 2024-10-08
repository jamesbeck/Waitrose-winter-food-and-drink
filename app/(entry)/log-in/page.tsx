import { Container } from '@/components/layout/container';
import { Content } from '@/components/layout/content';
import { H1 } from '@/components/typography/h1';
import { Small } from '@/components/typography/small';
import { Button } from '@/components/ui/button';
import { LogInForm } from './logInForm';

export default function Register() {
  return (
    <Content>
      <Container width="wide">
        <H1>Please log-in for the full experience</H1>
      </Container>

      <LogInForm />

      <div className="space-y-6 pt-6">
        <Container width="wide">
          <Small>
            If you&apos;d rather just look around, tap below. You won't be able
            to take part in our hunts, competitions, or make your own
            schedules/bookings
          </Small>
        </Container>

        <Button variant="outline">Limited Experience</Button>
      </div>
    </Content>
  );
}
