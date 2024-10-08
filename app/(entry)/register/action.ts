'use server';

import { db } from '@/lib/knex';
import type { FormSchema } from './schema';

type Result = { status: 'success' } | { status: 'error'; error: string };

export const register = async (values: FormSchema): Promise<Result> => {
  try {
    const existing = await db
      .table('users')
      .where('email', values.email)
      .first();

    if (existing) {
      return {
        status: 'error',
        error:
          'A user with that email address already exists. Please try logging in or entering a different email address.',
      };
    }

    await db.table('users').insert({
      email: values.email,
      first_name: values.firstName,
      last_name: values.lastName,
      loyalty_card_number: values.loyaltyCardNumber,
    });

    return { status: 'success' };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
};
