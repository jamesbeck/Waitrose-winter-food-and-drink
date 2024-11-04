import { getLoggedInEmail } from '../auth';
import { db } from '../knex';

export const getCurrentUser = async () => {
  const email = await getLoggedInEmail();

  return db.select('*').from('users').where('email', email).first();
};
