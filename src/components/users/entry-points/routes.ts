import { FastifyInstance } from 'fastify';
import UserService from '../domain/UserService';
import UserSchema from '../domain/UserSchema';

export default async function userRouter(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: new UserSchema().getFindOneSchema(),
    handler: new UserService().findOne,
  });

  fastify.route({
    method: 'GET',
    url: '/',
    schema: new UserSchema().getFindAllSchema(),
    handler: new UserService().findAll,
  });

  fastify.route({
    method: 'POST',
    url: '/',
    schema: new UserSchema().getCreateSchema(),
    handler: new UserService().create,
  });

  fastify.route({
    method: 'PUT',
    url: '/:id',
    schema: new UserSchema().getUpdateSchema(),
    handler: new UserService().update,
  });

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: new UserSchema().getDeleteSchema(),
    handler: new UserService().delete,
  });
}
