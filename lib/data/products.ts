'use server';

import type { Product } from 'knex/types/tables';
import { db } from '../knex';
import { getCurrentUser } from './user';

export type ProductWithWishlisted = Product & { is_wishlisted: boolean };

export type ProductList = {
  count: number;
  items: ProductWithWishlisted[];
};

type Params = {
  offset?: number;
  search?: string;
};

export const getProducts = async ({
  offset = 0,
  search,
}: Params): Promise<ProductList> => {
  const user = await getCurrentUser();

  const baseQuery = db.from('products');

  if (search) {
    baseQuery.whereILike('supplier', `${search}%`);
    baseQuery.orWhereILike('supplier', `% ${search}%`);
    baseQuery.orWhereILike('name', `${search}%`);
    baseQuery.orWhereILike('name', `% ${search}%`);

    // if (search.match(/^\d+$/)) {
    //   baseQuery.orWhere('stand_number', parseInt(search));
    // }
  }

  const [count, items] = await Promise.all([
    baseQuery.clone().count<{ count: string }[]>('*').first(),
    baseQuery
      .clone()
      .select<ProductWithWishlisted[]>([
        'products.*',
        db.raw('wishlist.product_line_number IS NOT NULL as "is_wishlisted"'),
      ])
      .leftJoin('wishlist', function () {
        this.on('products.line_number', '=', 'wishlist.product_line_number');

        if (user) {
          this.andOnVal('wishlist.user_id', user.id);
        } else {
          this.andOnNull('wishlist.user_id');
        }
      })
      .offset(offset)
      .limit(10),
  ]);

  return { count: count?.count ? parseInt(count.count) : 0, items };
};

export const getProduct = async (
  lineNumber: string
): Promise<ProductWithWishlisted | undefined> => {
  const user = await getCurrentUser();

  return db
    .select<ProductWithWishlisted[]>([
      'products.*',
      db.raw('wishlist.product_line_number IS NOT NULL as "is_wishlisted"'),
    ])
    .from('products')
    .leftJoin('wishlist', function () {
      this.on('products.line_number', '=', 'wishlist.product_line_number');

      if (user) {
        this.andOnVal('wishlist.user_id', user.id);
      } else {
        this.andOnNull('wishlist.user_id');
      }
    })
    .where('products.line_number', lineNumber)
    .first();
};
