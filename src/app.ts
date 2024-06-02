import { FastifyInstance, FastifyServerOptions } from 'fastify';
// import { closeDBConnection } from './database/config';
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

// let server: FastifyInstance;

// initServer();

// function initServer() {
//   buildFastify();
//   listenToFastify();
// }

export default async function buildFastify(
  server: FastifyInstance,
  opts: FastifyServerOptions,
  done: () => void,
) {
  // if (server) return server;

  server.withTypeProvider<TypeBoxTypeProvider>();
  server.setValidatorCompiler(({ schema }) => ajv.compile(schema));

  server.get('/', async () => {
    return 'Trendy Recipes API';
  });

  server.register(userRouter, { prefix: '/api/v1/users' });
  server.register(videoRouter, { prefix: '/api/v1/videos' });
  server.register(recipeRouter, { prefix: '/api/v1/recipes' });
  console.log('Server initialized');
  done();
  // return server;
}

export function destroyFastify() {
  // server.close();
  // closeDBConnection();
  return true;
}

// function listenToFastify() {
//   server.listen({ port: 3000, host: '127.0.0.1' }, (err, address) => {
//     if (err) {
//       console.error(err);
//       process.exit(1);
//     }
//     console.log(`Server listening at ${address}`);
//   });
// }
