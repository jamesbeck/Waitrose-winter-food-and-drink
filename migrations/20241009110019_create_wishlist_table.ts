import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('wishlist', (table) => {
    table.string('product_line_number').notNullable();
    table.integer('user_id').notNullable();
    table.timestamps(true, true);

    table.primary(['product_line_number', 'user_id']);

    table.foreign('product_line_number').references('products.line_number');
    table.foreign('user_id').references('users.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('wishlist');
}
