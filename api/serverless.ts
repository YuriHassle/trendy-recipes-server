'use strict';

import { FastifyReply, FastifyRequest } from 'fastify';

// Read the .env file.
import * as dotenv from 'dotenv';
dotenv.config();

// Require the framework
import Fastify from 'fastify';

import routes from '../src/app.js';

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
});

// Register your application as a normal plugin.
app.register(routes);

export default async (req: FastifyRequest, res: FastifyReply) => {
  await app.ready();
  app.server.emit('request', req, res);
};
