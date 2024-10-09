'use server';

import type { Product } from 'knex/types/tables';
import { db } from '../knex';

export const getProducts = async (
  offset: number = 0
): Promise<{ count: number; items: Product[] }> => {
  const [count, items] = await Promise.all([
    db.count<{ count: number }[]>('*').from('products').first(),
    db.select('*').from('products').offset(offset).limit(10),
  ]);

  return { count: count?.count || 0, items };
};
