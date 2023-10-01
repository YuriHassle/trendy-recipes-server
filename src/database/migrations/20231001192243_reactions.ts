import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // id, user_id, recipe_id, type (enum: like, wanna-cook, cooked), created_at, updated_at
  return knex.schema.createTable('reactions', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('id').inTable('users');
    table.integer('recipe_id').unsigned().notNullable();
    table.foreign('recipe_id').references('id').inTable('recipes');
    table.enu('type', ['like', 'wanna-cook', 'cooked']).notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('reactions');
}
