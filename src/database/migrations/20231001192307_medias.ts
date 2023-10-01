import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('medias', (table) => {
    table.increments('id').primary();
    table.integer('comment_id').unsigned().notNullable();
    table.foreign('comment_id').references('id').inTable('comments');
    table.string('url', 200).notNullable();
    table.boolean('active').notNullable().defaultTo(true);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('medias');
}
