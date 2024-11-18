"use client";

import { Container } from "@/components/layout/container";
import { Footnote } from "@/components/typography/footnote";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LogInDialog } from "../log-in/logInDialog";
import { registerAction } from "./action";
import { formSchema, type FormSchema } from "./schema";
import Link from "next/link";

type Props = {};

export const RegisterForm: React.FC<Props> = (props: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      loyaltyCardNumber: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    const result = await registerAction(data);

    if (result.status === "error") {
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

        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    required
                    className="placeholder:opacity-0"
                    placeholder="First Name"
                    {...field}
                  />
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
                  <Input
                    required
                    className="placeholder:opacity-0"
                    placeholder="Last Name"
                    {...field}
                  />
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
                <Input
                  type="text"
                  className="proportional-nums placeholder:opacity-0"
                  placeholder="Loyalty Card Number"
                  {...field}
                />
              </FormControl>
              <FormLabel>myWaitrose or my John Lewis number**</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Container width="wide">
          <Footnote>* Designates a required field</Footnote>

          <p className="pt-2">
            Through using clever technology, you won&apos;t need a
            password.&nbsp;
            <strong>Ever!</strong>
          </p>
        </Container>

        <Container width="wide">
          <Footnote>
            Please refer to our{" "}
            <Link
              className="underline"
              href="https://www.waitrose.com/ecom/help-information/privacy-notice?srsltid=AfmBOoqAQhIhMKQiRME-O7b1GXThE7tIg0BIKQvxOpGp7wE5zgQJRMhc"
            >
              Privacy Policy
            </Link>{" "}
            to see details on how we and our suppliers may use data to
            administer and provide the event and to request feedback. If there
            are any questions regarding this privacy policy you may contact us
            via{" "}
            <a className="undeline" href="mailto:info@waitrosefestivals.com">
              info@waitrosefestivals.com
            </a>
            .
          </Footnote>
        </Container>

        <Button type="submit" disabled={form.formState.isSubmitting}>
          Submit
        </Button>
      </form>

      <LogInDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </Form>
  );
};
