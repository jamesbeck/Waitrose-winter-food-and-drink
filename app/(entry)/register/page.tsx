import { Container } from '@/components/layout/container';
import { Content } from '@/components/layout/content';
import { H1 } from '@/components/typography/h1';
import { RegisterForm } from './registerForm';

export default function Register() {
  return (
    <Content>
      <Container>
        <H1>To register, please provide us with a few details</H1>
      </Container>

      <RegisterForm />
    </Content>
  );
}
