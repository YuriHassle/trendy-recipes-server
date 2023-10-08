import fastify from 'fastify';
import userRouter from './components/users/entry-points/routes';
import videoRouter from './components/videos/entry-points/routes';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import AJV from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';

const ajv = new AJV({ allErrors: true });
addFormats(ajv, ['email', 'time', 'uri'])
  .addKeyword('kind')
  .addKeyword('modifier');
addErrors(ajv);

const server = fastify().withTypeProvider<TypeBoxTypeProvider>();
server.setValidatorCompiler(({ schema }) => ajv.compile(schema));
server.register(userRouter, { prefix: '/users' });
server.register(videoRouter, { prefix: '/videos' });
server.register(videoRouter, { prefix: '/languages' });

server.listen({ port: 3000, host: '127.0.0.1' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
