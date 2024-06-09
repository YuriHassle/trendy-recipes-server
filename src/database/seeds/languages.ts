import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('languages').insert([
    { slug: 'pt-BR', name: 'Portuguese (Brasil)' },
    { slug: 'en-US', name: 'English (USA)' },
  ]);
}
