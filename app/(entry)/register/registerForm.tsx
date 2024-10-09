'use client';

import { Container } from '@/components/layout/container';
import { Footnote } from '@/components/typography/footnote';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LogInDialog } from '../log-in/logInDialog';
import { registerAction } from './action';
import { formSchema, type FormSchema } from './schema';

type Props = {};

export const RegisterForm: React.FC<Props> = (props: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      loyaltyCardNumber: '',
    },
  });

  const onSubmit = async (data: FormSchema) => {
    const result = await registerAction(data);

    if (result.status === 'error') {
      setError(result.error);
      return;
    }

    setDialogOpen(true);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="space-y-6 text-center"
      >
        {error && <Alert variant="destructive">{error}</Alert>}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" required {...field} />
              </FormControl>
              <FormLabel>Email Address</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input required {...field} />
                </FormControl>
                <FormLabel>First Name</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input required {...field} />
                </FormControl>
                <FormLabel>Last Name</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="loyaltyCardNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="number" className="proportional-nums" {...field} />
              </FormControl>
              <FormLabel>Loyalty Card Number**</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Container width="wide">
          <Footnote>* Designates a required field</Footnote>
          <Footnote>
            ** Without a MyWaitrose card you may be ineligible for prizes. Visit
            the signup desk to get one!
          </Footnote>

          <p className="pt-2">
            Through using clever technology, you won&apos;t need a password.
            <br />
            <strong>Ever!</strong>
          </p>
        </Container>

        <Button type="submit" disabled={form.formState.isSubmitting}>
          Submit
        </Button>
      </form>

      <LogInDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </Form>
  );
};
