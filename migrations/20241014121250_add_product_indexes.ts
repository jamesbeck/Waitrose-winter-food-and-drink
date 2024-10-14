import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('products', (table) => {
    table.index('supplier');
    table.index('room');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('products', (table) => {
    table.dropIndex('supplier');
    table.dropIndex('room');
  });
}
