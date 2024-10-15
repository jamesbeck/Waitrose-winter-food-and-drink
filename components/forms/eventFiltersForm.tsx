'use client';

import { H2 } from '@/components/typography/h2';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import type { FilterDay } from '@/lib/data/events';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

import { errorMap } from '@/lib/errorMap';
import { z } from 'zod';

z.setErrorMap(errorMap);

const formSchema = z.object({
  days: z
    .array(z.enum(['Friday', 'Saturday', 'Sunday']))
    .min(1, 'Please select at least one date'),
});

type FormSchema = z.infer<typeof formSchema>;

type Props = {
  onSubmitted?: (values: FormSchema) => void;
  days: FilterDay[];
};

const dateOptions: { label: string; value: FilterDay }[] = [
  { label: 'Friday 22nd November', value: 'Friday' },
  { label: 'Saturday 23rd November', value: 'Saturday' },
  { label: 'Sunday 24th November', value: 'Sunday' },
];

export const EventFiltersForm: React.FC<Props> = ({
  onSubmitted,
  days,
}: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      days,
    },
  });

  const onSubmit = async (values: FormSchema) => {
    const params = new URLSearchParams(searchParams);

    if (values.days && values.days.length > 0 && values.days.length < 3) {
      params.set('days', values.days.join(','));
    } else {
      params.delete('days');
    }

    router.push(`${pathname}?${params.toString()}`);

    onSubmitted?.(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col grow"
      >
        <div className="space-y-3 grow">
          <H2>Choose your dates</H2>

          <div className="font-light divide-y divide-light-grey border-light-grey border-t border-b text-dark-grey">
            {dateOptions.map((option) => (
              <FormField
                key={option.value}
                control={form.control}
                name="days"
                render={({ field }) => (
                  <FormItem className="flex pr-6 py-3">
                    <label className="grow" htmlFor={option.value}>
                      {option.label}
                    </label>

                    <FormControl>
                      <Checkbox
                        id={option.value}
                        checked={field.value?.includes(option.value)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, option.value])
                            : field.onChange(
                                field.value?.filter(
                                  (value) => value !== option.value
                                )
                              );
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>

          {form.formState.errors && form.formState.errors.days && (
            <Alert variant="destructive">
              {form.formState.errors.days.message}
            </Alert>
          )}
        </div>

        <Button>Apply</Button>
      </form>
    </Form>
  );
};
