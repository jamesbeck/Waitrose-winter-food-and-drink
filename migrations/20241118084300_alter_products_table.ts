import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('products', (table) => {
    table.dropColumn('sale_price');
    table.dropColumn('unit');
  })
  .then(() => {
    return knex.schema.createTable('event_products', (table) => {
      table.string('event_id').notNullable();
      table.string('product_line_number').notNullable();
      
      table.primary(['event_id', 'product_line_number']);

    });
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('products', (table) => {
    table.string('sale_price');
    table.string('unit');
  }).then(() => {
    return knex.schema.dropTable('event_products');
  });
}

