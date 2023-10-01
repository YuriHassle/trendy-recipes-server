import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('videos', (table) => {
    table.increments('id').primary();
    table.string('url', 200).notNullable();
    table.enu('source', ['tiktok']).defaultTo('tiktok');
    table.boolean('active').notNullable().defaultTo(true);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('videos');
}
