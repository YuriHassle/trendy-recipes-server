import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('recipe_tags', (table) => {
    table.increments('id').primary();
    table.integer('tag_id').unsigned().notNullable();
    table.foreign('tag_id').references('id').inTable('tags');
    table.integer('recipe_id').unsigned().notNullable();
    table.foreign('recipe_id').references('id').inTable('recipes');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('recipe_tags');
}
