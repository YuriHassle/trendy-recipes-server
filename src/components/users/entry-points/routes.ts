import { FastifyInstance } from 'fastify';
import { findAll } from '../data-access/repository';

export default async function userRouter(fastify: FastifyInstance) {
  fastify.get('/', async () => {
    const users = await findAll();
    console.log('users', users);
    return users;
  });
}
