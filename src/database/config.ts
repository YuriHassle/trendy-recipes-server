import knex, { Knex } from 'knex';
import { DB_CLIENT } from '../utils/constants';
import dotenv from 'dotenv';
dotenv.config();

export const dbConfig = {
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
