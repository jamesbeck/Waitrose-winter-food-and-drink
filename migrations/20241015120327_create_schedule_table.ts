import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('schedule', (table) => {
    table.string('event_id').notNullable();
    table.integer('user_id').notNullable();
    table.timestamps(true, true);

    table.primary(['event_id', 'user_id']);

    table.foreign('event_id').references('events.id');
    table.foreign('user_id').references('users.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('schedule');
}
