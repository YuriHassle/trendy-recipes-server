'use strict';

import { FastifyReply, FastifyRequest } from 'fastify';

import * as dotenv from 'dotenv';
dotenv.config();

import { createServer } from '../src/app.js';

const app = createServer();

export default async (req: FastifyRequest, res: FastifyReply) => {
  await app.ready();
  app.server.emit('request', req, res);

  console.log('Fastify initialized in serverless mode');
};
