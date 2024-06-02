import type { Knex } from 'knex';
import { dbConfig } from './src/database/config';

const fullDbConfig = {
  ...dbConfig,
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/database/migrations',
  },
};

const config: { [key: string]: Knex.Config } = {
  development: fullDbConfig,
  staging: fullDbConfig,
  production: fullDbConfig,
};

export default config;
