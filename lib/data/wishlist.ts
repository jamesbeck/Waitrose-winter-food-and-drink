'use server';

import type { Product } from 'knex/types/tables';
import { db } from '../knex';
import type { ProductWithWishlisted } from './products';
import { getCurrentUser } from './user';

export const getWishlist = async (
  offset = 0
): Promise<{ count: number; items: ProductWithWishlisted[] }> => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('User not found');
  }

  const [count, items] = await Promise.all([
    db
      .count<{ count: number }[]>('*')
      .from('wishlist')
      .where('user_id', user.id)
      .first(),
    db
      .select<ProductWithWishlisted[]>([
        'products.*',
        db.raw('true as "is_wishlisted"'),
      ])
      .from('wishlist')
      .leftJoin(
        'products',
        'products.line_number',
        '=',
        'wishlist.product_line_number'
      )
      .where('wishlist.user_id', user.id)
      .offset(offset)
      .limit(10),
  ]);

  return { count: count?.count || 0, items };
};

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
