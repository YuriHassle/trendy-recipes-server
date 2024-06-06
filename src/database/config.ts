import knex, { Knex } from 'knex';
import { DB_CLIENT } from '../utils/constants';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

dotenvExpand.expand(dotenv.config());
export const dbConfig: Knex.Config = {
  client: DB_CLIENT,
  connection: process.env.DB_CONNECTION_STRING,
  pool: { min: 2, max: 10 },
};

let dbConnection: Knex;
export default function getDBConnection() {
  if (dbConnection) return dbConnection;

  dbConnection = knex(dbConfig);

  return dbConnection;
}

export function closeDBConnection() {
  if (dbConnection) {
    dbConnection.destroy();
  }
}
