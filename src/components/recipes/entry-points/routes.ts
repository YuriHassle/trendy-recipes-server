import { FastifyInstance } from 'fastify';
import RecipeService from '../domain/RecipeService';
import RecipeSchema from '../domain/RecipeSchema';

export default async function RecipeRouter(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: new RecipeSchema().getFindOneSchema(),
    handler: new RecipeService().findOne,
  });

  fastify.route({
    method: 'GET',
    url: '/',
    schema: new RecipeSchema().getFindAllSchema(),
    handler: new RecipeService().findAll,
  });

  fastify.route({
    method: 'POST',
    url: '/',
    schema: new RecipeSchema().getCreateSchema(),
    handler: new RecipeService().create,
  });

  fastify.route({
    method: 'PUT',
    url: '/:id',
    schema: new RecipeSchema().getUpdateSchema(),
    handler: new RecipeService().update,
  });

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: new RecipeSchema().getDeleteSchema(),
    handler: new RecipeService().delete,
  });
}
