'use server';

import type { Product } from 'knex/types/tables';
import { db } from '../knex';
import { getCurrentUser } from './user';

export type ProductWithWishlisted = Product & { is_wishlisted: boolean };

type ProductList = {
  count: number;
  items: ProductWithWishlisted[];
};

export const getProducts = async (offset: number = 0): Promise<ProductList> => {
  const user = await getCurrentUser();

  const [count, items] = await Promise.all([
    db.count<{ count: number }[]>('*').from('products').first(),
    db
      .select<ProductWithWishlisted[]>([
        'products.*',
        db.raw('wishlist.product_line_number IS NOT NULL as "is_wishlisted"'),
      ])
      .from('products')
      .leftJoin('wishlist', function () {
        this.on('products.line_number', '=', 'wishlist.product_line_number');

        if (user) {
          this.andOnVal('wishlist.user_id', user.id);
        }
      })
      .offset(offset)
      .limit(10),
  ]);

  return { count: count?.count || 0, items };
};
