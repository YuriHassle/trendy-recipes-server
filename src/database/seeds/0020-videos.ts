import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('videos').insert([
    { url: 'https://www.tiktok.com/@user/video/123', source: 'tiktok' },
  ]);
}
