import knex from 'knex';

declare module 'knex/types/tables' {
  interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    loyalty_card_number: string;
    login_token: string;
    login_token_expiry: Date;
    created_at: Date;
    updated_at: Date;
  }

  interface Tables {
    users: User;
  }
}

export const db = knex({
  client: 'pg',
  connection: process.env.DB_CONNECTION_URL,
});
