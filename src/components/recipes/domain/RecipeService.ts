import RecipeRepository from '../data-access/RecipeRepository';
import { FastifyRequest } from 'fastify';
import {
  FastifyCustomReply,
  DefaultRequest,
  DefaultReply,
} from '../../../generators/BaseSchema';
import { DefaultMessageType } from '../../../utils/schemas';
import { RecipeType, RecipeBodyAddType, RecipeBodyUpdateType } from './RecipeSchema';
import RM from '../../../messages/ResponseMessages';

const entityName = 'Recipe';
const returningFields: Array<keyof RecipeType> = [
  'id',
  'active',
  'title',
  'description',
  'ingredients',
  'preparation',
  'user_id',
  'video_id',
  'created_at',
  'updated_at',
];

export default class RecipeService {
  async findOne(
    request: FastifyRequest<DefaultRequest>,
    reply: FastifyCustomReply<DefaultReply<RecipeType | DefaultMessageType>>,
  ) {
    const { id } = request.params;
    const parsedId = Number(id);
    const recipe = await new RecipeRepository().findById(parsedId);
    if (!recipe) {
      reply.status(400).send({
        message: RM.notFound(entityName, parsedId),
      });
    }
    reply.status(200).send(recipe);
  }

  async findAll(
    request: FastifyRequest<DefaultRequest>,
    reply: FastifyCustomReply<DefaultReply<RecipeType[]>>,
  ) {
    const { offset, orderBy, orderDirection, limit } = request.query;
    const recipes = await new RecipeRepository().findAll({
      limit,
      offset,
      orderBy,
      orderDirection,
    });
    reply.status(200).send(recipes);
  }

  async create(
    request: FastifyRequest<DefaultRequest<RecipeBodyAddType>>,
    reply: FastifyCustomReply<DefaultReply<RecipeType>>,
  ) {
    const payload = {
      description: request.body.description,
      ingredients: request.body.ingredients,
      preparation: request.body.preparation,
      title: request.body.title,
      user_id: request.body.user_id,
      video_id: request.body.video_id,
      language_id: request.body.language_id,
    };

    const recipe = await new RecipeRepository().create({
      payload,
      returningFields,
    });
    reply.status(201).send(recipe[0]);
  }

  async update(
    request: FastifyRequest<DefaultRequest<RecipeBodyUpdateType>>,
    reply: FastifyCustomReply<DefaultReply<RecipeType | DefaultMessageType>>,
  ) {
    const { id } = request.params;
    const parsedId = Number(id);
    const { description, ingredients, preparation, title } = request.body;
    const payload = {
      description,
      ingredients,
      preparation,
      title,
    };

    const updatedRecipe = await new RecipeRepository().update({
      id: parsedId,
      payload,
      returningFields,
    });

    if (!updatedRecipe.length) {
      reply.status(400).send({
        message: RM.notFound(entityName, parsedId),
      });
    }
    reply.status(200).send(updatedRecipe[0]);
  }

  async delete(
    request: FastifyRequest<DefaultRequest>,
    reply: FastifyCustomReply<DefaultReply<DefaultMessageType>>,
  ) {
    const { id } = request.params;
    const parsedId = Number(id);
    const isDeleted = await new RecipeRepository().delete(parsedId);
    if (!isDeleted) {
      reply.status(400).send({
        message: RM.notFound(entityName, parsedId),
      });
    }
    reply.status(200).send({
      message: RM.delete(entityName, parsedId),
    });
  }
}
