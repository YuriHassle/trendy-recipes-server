import { FastifyInstance } from 'fastify';
import VideoService from '../domain/VideoService';
import VideoSchema from '../domain/VideoSchema';

export default async function userRouter(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: new VideoSchema().getFindOneSchema(),
    handler: new VideoService().findOne,
  });

  fastify.route({
    method: 'GET',
    url: '/',
    schema: new VideoSchema().getFindAllSchema(),
    handler: new VideoService().findAll,
  });

  fastify.route({
    method: 'POST',
    url: '/',
    schema: new VideoSchema().getCreateSchema(),
    handler: new VideoService().create,
  });

  fastify.route({
    method: 'PUT',
    url: '/:id',
    schema: new VideoSchema().getUpdateSchema(),
    handler: new VideoService().update,
  });

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: new VideoSchema().getDeleteSchema(),
    handler: new VideoService().delete,
  });
}
