'use strict';

// Read the .env file.
import * as dotenv from 'dotenv';
dotenv.config();

// Require the framework
import Fastify from 'fastify';

// import routes from '../src/app.js';

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
});

// Register your application as a normal plugin.
app.get('/', async (req, res) => {
  return res.status(200).type('text/html').send('hello world');
});
// app.register(routes);

export default async (req, res) => {
  await app.ready();
  app.server.emit('request', req, res);
};
