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
      limit: Number(limit),
      offset: Number(offset),
      orderBy,
      orderDirection,
    });
    reply.status(200).send(recipes);
  }

  async create(
    request: FastifyRequest<DefaultRequest<RecipeBodyAddType>>,
    reply: FastifyCustomReply<DefaultReply<RecipeType>>,
  ) {
    const {
      description,
      ingredients,
      preparation,
      title,
      user_id,
      video_id,
      language_id,
    } = request.body;
    const recipeId = await new RecipeRepository().create({
      description,
      ingredients,
      preparation,
      title,
      user_id,
      video_id,
      language_id,
    });
    const newRecipe = await new RecipeRepository().findById(recipeId[0]);
    reply.status(201).send(newRecipe);
  }

  async update(
    request: FastifyRequest<DefaultRequest<RecipeBodyUpdateType>>,
    reply: FastifyCustomReply<DefaultReply<RecipeType | DefaultMessageType>>,
  ) {
    const { id } = request.params;
    const parsedId = Number(id);
    const { description, ingredients, preparation, title } = request.body;
    await new RecipeRepository().update(parsedId, {
      description,
      ingredients,
      preparation,
      title,
    });
    const updatedRecipe = await new RecipeRepository().findById(parsedId);
    if (!updatedRecipe) {
      reply.status(400).send({
        message: RM.notFound(entityName, parsedId),
      });
    }
    reply.status(200).send(updatedRecipe);
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
