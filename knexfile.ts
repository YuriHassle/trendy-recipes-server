import type { Knex } from 'knex';
import { dbConfig } from './src/database/config';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

dotenvExpand.expand(dotenv.config());

const config: Knex.Config = {
  ...dbConfig,
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/database/migrations',
  },
  seeds: {
    directory: './src/database/seeds',
  },
};

export default config;
