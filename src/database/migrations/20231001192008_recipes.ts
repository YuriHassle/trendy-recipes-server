import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('recipes', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('id').inTable('users');
    table.integer('video_id').unsigned().notNullable();
    table.foreign('video_id').references('id').inTable('videos');
    table.integer('language_id').unsigned().notNullable();
    table.foreign('language_id').references('id').inTable('languages');
    table.string('name', 100).notNullable();
    table.string('description', 100).notNullable();
    table.string('ingredients', 1000).notNullable();
    table.string('preparation', 5000).notNullable();
    table.boolean('active').notNullable().defaultTo(true);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('recipes');
}
