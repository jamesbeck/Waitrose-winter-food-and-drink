import { db } from '../knex';

export const getProducts = async () => {
  return db.select('*').from('products').limit(10);
};
