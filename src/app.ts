import fastify, { FastifyInstance } from 'fastify';
import { closeDBConnection } from './database/config';
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

let server: FastifyInstance;
buildFastify();
listenToFastify();

export function buildFastify() {
  if (server) return server;

  server = fastify().withTypeProvider<TypeBoxTypeProvider>();
  server.setValidatorCompiler(({ schema }) => ajv.compile(schema));
  server.register(userRouter, { prefix: '/users' });
  server.register(videoRouter, { prefix: '/videos' });
  server.register(recipeRouter, { prefix: '/recipes' });

  return server;
}

export function destroyFastify() {
  server.close();
  closeDBConnection();
}

function listenToFastify() {
  server.listen({ port: 3000, host: '127.0.0.1' }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}
