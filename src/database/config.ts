import knex, { Knex } from 'knex';
import dotenv from 'dotenv';
dotenv.config();

let dbConnection: Knex;
export default function getDBConnection() {
  if (!dbConnection) {
    dbConnection = knex({
      client: 'mysql',
      debug: false,
      connection: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || ''),
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      },
    });
  }

  return dbConnection;
}
