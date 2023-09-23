import { FastifyInstance } from 'fastify';

export default async function userRouter(fastify: FastifyInstance) {
  fastify.get('/', async () => {
    return 'video routes';
  });
}
