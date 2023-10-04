import { Static, TSchema } from '@sinclair/typebox';
import UserRepository from '../data-access/UserRepository';
import { FastifyRequest } from 'fastify';
import {
  BaseQueryType,
  BaseParamType,
  BaseMessageType,
  FastifyCustomReply,
} from '../../../common/BaseSchema';
import {
  UserType,
  UserBodyAddType,
  UsersType,
  UserBodyUpdateType,
} from './UserSchema';
import RM from '../../../common/ResponseMessages';
import { serializeResponse } from '../../../common/serializer';

interface UserRequest<CustomBody extends TSchema = never> {
  Body: CustomBody;
  Params: Static<BaseParamType>;
  Querystring: Static<BaseQueryType>;
}

interface UserReply<
  CustomReply extends TSchema,
  CustomBody extends TSchema = never,
> extends UserRequest<CustomBody> {
  Reply: Static<CustomReply>;
}

const entityName = 'User';

export default class UserService {
  async findAll(
    request: FastifyRequest<UserRequest>,
    reply: FastifyCustomReply<UserReply<UsersType>>,
  ) {
    const { offset, orderBy, orderDirection, limit } = request.query;
    const users = await new UserRepository().findAll({
      limit: Number(limit) || undefined,
      offset: Number(offset) || undefined,
      orderBy,
      orderDirection,
    });
    reply.status(200).send(serializeResponse<UsersType>(users));
  }

  async create(
    request: FastifyRequest<UserRequest<UserBodyAddType>>,
    reply: FastifyCustomReply<UserReply<UserType, UserBodyAddType>>,
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
    reply.status(201).send(serializeResponse<UserType>(newUser));
  }

  async update(
    request: FastifyRequest<UserRequest<UserBodyUpdateType>>,
    reply: FastifyCustomReply<
      UserReply<UserType | BaseMessageType, UserBodyUpdateType>
    >,
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
    if (!updatedUser) {
      reply.status(400).send(
        serializeResponse<BaseMessageType>({
          message: RM.notFound(entityName, parsedId),
        }),
      );
    }
    reply.status(200).send(serializeResponse<UserType>(updatedUser));
  }

  async delete(
    request: FastifyRequest<UserRequest>,
    reply: FastifyCustomReply<UserReply<BaseMessageType>>,
  ) {
    const { id } = request.params;
    const parsedId = Number(id);
    const isDeleted = await new UserRepository().delete(parsedId);
    if (!isDeleted) {
      reply.status(400).send(
        serializeResponse<BaseMessageType>({
          message: RM.notFound(entityName, parsedId),
        }),
      );
    }
    reply.status(200).send(
      serializeResponse<BaseMessageType>({
        message: RM.delete(entityName, parsedId),
      }),
    );
  }
}
