import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('recipes').insert([
    {
      title: 'Bimbimbap',
      description: 'Beef Bimbimbap',
      ingredients: 'Rice, beef, vegetables, egg',
      preparation: 'Cook the rice, fry the beef, fry the vegetables, fry the egg',
      user_id: 1,
      video_id: 1,
      language_id: 1,
    },
  ]);
}
