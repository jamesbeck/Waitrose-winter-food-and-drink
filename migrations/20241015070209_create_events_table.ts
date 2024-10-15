import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('events', (table) => {
    table.string('id').primary();
    table.enum('type', ['standard', 'masterclass']).notNullable();
    table.string('room').notNullable();
    table.string('day').notNullable();
    table.string('start_time').notNullable();
    table.string('end_time').notNullable();
    table.string('image_url');
    table.string('name').notNullable();
    table.text('description');
    table.timestamps(true, true);

    table.index('type');
    table.index('day');
    table.index('start_time');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('events');
}
