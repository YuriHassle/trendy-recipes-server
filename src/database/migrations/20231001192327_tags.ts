import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tags', (table) => {
    table.increments('id').primary();
    table.integer('language_id').unsigned().notNullable();
    table.foreign('language_id').references('id').inTable('languages');
    table.string('name', 100).notNullable();
    table.boolean('active').notNullable().defaultTo(true);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tags');
}
