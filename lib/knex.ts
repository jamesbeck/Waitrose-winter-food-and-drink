import knex from 'knex';

declare module 'knex/types/tables' {
  type User = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    loyalty_card_number?: string;
    created_at: Date;
    updated_at: Date;
  };

  type Product = {
    line_number: string;
    name: string;
    image_url?: string;
    supplier: string;
    room?: string;
    stand_number?: number;
    normal_price?: string;
    sale_price?: string;
    unit?: string;
    description?: string;
    website_url?: string;
    created_at: Date;
    updated_at: Date;
  };

  type Wishlist = {
    product_line_number: string;
    user_id: number;
    created_at: Date;
    updated_at: Date;
  };

  type Event = {
    id: string;
    type: 'standard' | 'masterclass';
    room: string;
    day: string;
    start_time: string;
    end_time: string;
    image_url?: string;
    name: string;
    description?: string;
    created_at: Date;
    updated_at: Date;
  };

  interface Tables {
    users: User;
    products: Product;
    wishlist: Wishlist;
  }
}

export const db = knex({
  client: 'pg',
  connection: process.env.DB_CONNECTION_URL,
});
