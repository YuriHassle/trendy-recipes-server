import { FastifyInstance } from 'fastify';
import UserService from '../domain/UserService';
import UserSchema from '../domain/UserSchema';

export default async function userRouter(fastify: FastifyInstance) {
  fastify.get(
    '/',
    { schema: new UserSchema().getFindAllSchema() },
    new UserService().findAll,
  );

  fastify.post(
    '/',
    { schema: new UserSchema().getCreateSchema() },
    new UserService().create,
  );

  fastify.put(
    '/:id',
    { schema: new UserSchema().getUpdateSchema() },
    new UserService().update,
  );

  fastify.delete(
    '/:id',
    { schema: new UserSchema().getDeleteSchema() },
    new UserService().delete,
  );
}
