import { Container } from '@/components/layout/container';
import { Content } from '@/components/layout/content';
import { H1 } from '@/components/typography/h1';
import { getCurrentUser } from '@/lib/data/user';
import { redirect } from 'next/navigation';
import { RegisterForm } from './registerForm';

export default async function Register() {
  const user = await getCurrentUser();

  if (user) {
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
