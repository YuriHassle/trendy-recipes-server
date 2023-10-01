import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.integer('language_id').unsigned().notNullable();
    table.foreign('language_id').references('id').inTable('languages');
    table.string('name', 100).notNullable();
    table.string('email', 100).notNullable();
    table.string('password', 100).notNullable();
    table.integer('points').notNullable();
    table.string('avatar', 200);
    table.boolean('active').notNullable().defaultTo(true);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
