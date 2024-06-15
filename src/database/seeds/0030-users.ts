import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('users').insert([
    {
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
      language_id: 1,
      active: true,
    },
  ]);
}
