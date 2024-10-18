'use client';

import { Container } from '@/components/layout/container';
import { Footnote } from '@/components/typography/footnote';
import { InlineLink } from '@/components/typography/inlineLink';
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
import { logInAction } from './action';
import { LogInDialog } from './logInDialog';
import { formSchema, FormSchema } from './schema';

type Props = {};

export const LogInForm: React.FC<Props> = (props: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: FormSchema) => {
    const result = await logInAction(data);

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
        className="space-y-3 text-center"
      >
        {error && <Alert variant="destructive">{error}</Alert>}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  required
                  className="placeholder:opacity-0"
                  placeholder="Email Address"
                  {...field}
                />
              </FormControl>
              <FormLabel>Email Address</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Container>
          <Footnote>* Designates a required field</Footnote>
        </Container>

        <div className="pt-6 space-y-2">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Submit
          </Button>

          <Container>
            Don&apos;t have an account?{' '}
            <InlineLink href="/register">Register here</InlineLink>
          </Container>
        </div>
      </form>

      <LogInDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </Form>
  );
};
