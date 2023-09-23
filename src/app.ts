import fastify from 'fastify';
import userRouter from './components/users/entry-points/routes';
import videoRouter from './components/videos/entry-points/routes';

const server = fastify();
server.register(userRouter, { prefix: '/users' });
server.register(videoRouter, { prefix: '/videos' });

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
