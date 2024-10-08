import { H1 } from '@/components/typography/h1';
import { RegisterForm } from './registerForm';

export default function Register() {
  return (
    <section className="p-6 space-y-6">
      <div className="px-12">
        <H1>To register, please provide us with a few details</H1>
      </div>

      <RegisterForm />
    </section>
  );
}
