import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import userRouter from './components/users/entry-points/routes';
import videoRouter from './components/videos/entry-points/routes';
import recipeRouter from './components/recipes/entry-points/routes';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import AJV from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';

const ajv = new AJV({ allErrors: true });
addFormats(ajv, ['email', 'time', 'uri']).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);

export async function addFastifyRoutes(server: FastifyInstance): Promise<void> {
  server.withTypeProvider<TypeBoxTypeProvider>();
  server.setValidatorCompiler(({ schema }) => ajv.compile(schema));
  server.register(cors, {
    origin: ['http://localhost:3001', 'https://www.trendy-recipes.com.br'],
  });

  server.get('/', async () => {
    return 'Trendy Recipes API';
  });

  server.register(userRouter, { prefix: '/api/v1/users' });
  server.register(videoRouter, { prefix: '/api/v1/videos' });
  server.register(recipeRouter, { prefix: '/api/v1/recipes' });
}

export function createServer(): FastifyInstance {
  const server = Fastify();
  addFastifyRoutes(server);
  return server;
}
