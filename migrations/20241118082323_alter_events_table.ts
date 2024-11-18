import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('events', (table) => {
    table.boolean('is_masterclass').defaultTo(false);
    table.string('floor')
    table.string('type').alter();   
  })
  .then(() => {
    return knex.raw('ALTER TABLE events DROP CONSTRAINT events_type_check');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('events', (table) => {
    table.dropColumn('is_masterclass');
    table.dropColumn('floor');
    table.enum('type', ['standard', 'masterclass']).notNullable().alter();
  });
}

