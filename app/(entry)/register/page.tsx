import { Container } from '@/components/layout/container';
import { Content } from '@/components/layout/content';
import { H1 } from '@/components/typography/h1';
import { getLoggedInEmail } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { RegisterForm } from './registerForm';

export default function Register() {
  const email = getLoggedInEmail();

  if (email) {
    redirect('/home');
  }

  return (
    <Content>
      <Container>
        <H1>To register, please provide us with a few details</H1>
      </Container>

      <RegisterForm />
    </Content>
  );
}
