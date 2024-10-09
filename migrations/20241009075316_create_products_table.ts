import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('products', (table) => {
    table.string('line_number').primary();
    table.string('name').notNullable();
    table.string('image_url');
    table.string('supplier').notNullable();
    table.string('room');
    table.integer('normal_price').notNullable();
    table.integer('sale_price');
    table.string('unit');
    table.text('description');
    table.string('website_url');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('products');
}
