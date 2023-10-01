import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('reviews', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('id').inTable('users');
    table.integer('recipe_id').unsigned().notNullable();
    table.foreign('recipe_id').references('id').inTable('recipes');
    table.boolean('approved').notNullable().defaultTo(false);
    table.enu('type', ['addition', 'edit']).notNullable();
    table.string('comment', 400).notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('reviews');
}
