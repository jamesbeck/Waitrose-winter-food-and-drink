'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { SearchInput } from '@/components/ui/searchInput';
import { zodResolver } from '@hookform/resolvers/zod';
import debounce from 'debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { formSchema, type FormSchema } from './schema';

type Props = {
  search?: string;
};

export const SearchForm: React.FC<Props> = ({ search }: Props) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: search || '',
    },
  });

  const onSubmit = useCallback(
    async (values: FormSchema) => {
      const params = new URLSearchParams(searchParams);

      if (values.search) {
        params.set('search', values.search);
      } else {
        params.delete('search');
      }

      replace(`/products?${params.toString()}`);
    },
    [replace, searchParams]
  );

  const debouncedSubmit = useCallback(
    () => debounce(form.handleSubmit(onSubmit), 300)(),
    [form, onSubmit]
  );

  useEffect(() => {
    const subscription = form.watch(() => {
      debouncedSubmit();
    });

    return () => subscription.unsubscribe();
  }, [form, debouncedSubmit]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="space-y-3 text-center"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <SearchInput
                  placeholder="Search by supplier name or stand no"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
