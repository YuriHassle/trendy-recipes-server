import { Static } from '@sinclair/typebox';
import UserRepository from '../data-access/UserRepository';
import { FastifyRequest, RouteGenericInterface } from 'fastify';
import {
  BaseQueryType,
  BaseParamType,
  BaseMessageType,
  FastifyCustomReply,
} from '../../../common/BaseSchema';
import {
  UserType,
  UserBodyAddType,
  UserBodyUpdateType,
  UsersType,
} from './UserSchema';
import RM from '../../../common/ResponseMessages';

// TODO: refactor this to be reusable
interface MessageReply extends RouteGenericInterface {
  Params: Static<BaseParamType>;
  Reply: Static<BaseMessageType>;
}
interface UserReply extends RouteGenericInterface {
  Body: Static<UserBodyAddType>;
  Params: Static<BaseParamType>;
  Reply: UserType;
}
interface UsersReply extends RouteGenericInterface {
  Querystring: Static<BaseQueryType>;
  Reply: UsersType;
}

const entityName = 'User';

export default class UserService {
  async findAll(
    request: FastifyRequest<{ Querystring: Static<BaseQueryType> }>,
    reply: FastifyCustomReply<UsersReply>,
  ) {
    const { offset, orderBy, orderDirection, limit } = request.query;
    const users = await new UserRepository().findAll({
      limit: Number(limit) || undefined,
      offset: Number(offset) || undefined,
      orderBy,
      orderDirection,
    });
    reply.status(200).send(users);
  }

  async create(
    request: FastifyRequest<{ Body: Static<UserBodyAddType> }>,
    reply: FastifyCustomReply<UserReply>,
  ) {
    const { email, language_id, name, password, points } = request.body;
    const userId = await new UserRepository().create({
      email,
      name,
      password,
      points,
      language_id,
    });
    const newUser = await new UserRepository().findById(userId[0]);
    // TODO: serialize response to POJO before sending to client
    reply.status(201).send(newUser);
  }

  async update(
    request: FastifyRequest<{
      Body: Static<UserBodyUpdateType>;
      Params: Static<BaseParamType>;
    }>,
    reply: FastifyCustomReply<UserReply>,
  ) {
    const { id } = request.params;
    const parsedId = Number(id);
    const { email, language_id, name } = request.body;
    await new UserRepository().update(parsedId, {
      email,
      name,
      language_id,
    });
    const updatedUser = await new UserRepository().findById(parsedId);
    reply.status(200).send(updatedUser);
  }

  async delete(
    request: FastifyRequest<{ Params: Static<BaseParamType> }>,
    reply: FastifyCustomReply<MessageReply>,
  ) {
    const { id } = request.params;
    const parsedId = Number(id);
    await new UserRepository().delete(parsedId);
    reply.status(200).send({ message: RM.delete(entityName, parsedId) });
  }
}
