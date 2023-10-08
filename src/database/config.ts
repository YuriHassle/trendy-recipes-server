import knex, { Knex } from 'knex';
import { DB_CLIENT } from '../utils/constants';
import dotenv from 'dotenv';
dotenv.config();

export const dbConfig = {
  client: DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || ''),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  pool: { min: 2, max: 10 },
};

let dbConnection: Knex;
export default function getDBConnection() {
  if (!dbConnection) {
    dbConnection = knex(dbConfig);
  }

  return dbConnection;
}
