import fastify from 'fastify';
import userRouter from './components/users/entry-points/routes';
import videoRouter from './components/videos/entry-points/routes';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

const server = fastify().withTypeProvider<TypeBoxTypeProvider>();
server.register(userRouter, { prefix: '/users' });
server.register(videoRouter, { prefix: '/videos' });

server.listen({ port: 3000, host: '127.0.0.1' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
