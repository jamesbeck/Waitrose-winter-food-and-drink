'use server';

import type { Product } from 'knex/types/tables';
import { db } from '../knex';
import { getCurrentUser } from './user';

export const addProductToWishlist = async (
  line_number: Product['line_number']
) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('User not found');
  }

  await db
    .table('wishlist')
    .insert({ user_id: user?.id, product_line_number: line_number });
};

export const removeProductFromWishlist = async (
  line_number: Product['line_number']
) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('User not found');
  }

  await db
    .table('wishlist')
    .where({ user_id: user.id, product_line_number: line_number })
    .delete();
};
