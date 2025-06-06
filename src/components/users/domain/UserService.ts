import UserRepository from '../data-access/UserRepository';
import { FastifyRequest } from 'fastify';
import {
  FastifyCustomReply,
  DefaultReply,
  DefaultRequest,
} from '../../../generators/BaseSchema';
import { DefaultMessageType } from '../../../utils/schemas';
import { UserBodyAddType, UserType, UserBodyUpdateType } from './UserSchema';
import RM from '../../../messages/ResponseMessages';
import { User } from '../data-access/model';

const entityName = 'User';
const returningFields: Array<keyof User> = [
  'id',
  'active',
  'email',
  'name',
  'points',
  'language_id',
  'created_at',
  'updated_at',
];

export default class UserService {
  async findOne(
    request: FastifyRequest<DefaultRequest>,
    reply: FastifyCustomReply<DefaultReply<UserType | DefaultMessageType>>,
  ) {
    const { id } = request.params;
    const parsedId = Number(id);
    const user = await new UserRepository().findById(parsedId);
    if (!user) {
      reply.status(404).send({
        message: RM.notFound(entityName, parsedId),
      });
    }
    reply.status(200).send(user);
  }

  async findAll(
    request: FastifyRequest<DefaultRequest>,
    reply: FastifyCustomReply<DefaultReply<UserType[]>>,
  ) {
    const { offset, orderBy, orderDirection, limit } = request.query;
    const users = await new UserRepository().findAll({
      limit,
      offset,
      orderBy,
      orderDirection,
    });
    reply.status(200).send(users);
  }

  async create(
    request: FastifyRequest<DefaultRequest<UserBodyAddType>>,
    reply: FastifyCustomReply<DefaultReply<UserType>>,
  ) {
    const { email, language_id, name, password, points } = request.body;

    const payload = {
      email,
      name,
      password,
      points,
      language_id,
    };

    const user = await new UserRepository().create({
      payload,
      returningFields,
    });

    reply.status(201).send(user[0]);
  }

  async update(
    request: FastifyRequest<DefaultRequest<UserBodyUpdateType>>,
    reply: FastifyCustomReply<DefaultReply<UserType | DefaultMessageType>>,
  ) {
    const { id } = request.params;
    const parsedId = Number(id);
    const { email, language_id, name } = request.body;

    const payload = {
      email,
      name,
      language_id,
    };

    const updatedUser = await new UserRepository().update({
      id: parsedId,
      payload,
      returningFields,
    });

    if (!updatedUser.length) {
      reply.status(404).send({
        message: RM.notFound(entityName, parsedId),
      });
    }
    reply.status(200).send(updatedUser[0]);
  }

  async delete(
    request: FastifyRequest<DefaultRequest>,
    reply: FastifyCustomReply<DefaultReply<DefaultMessageType>>,
  ) {
    const { id } = request.params;
    const parsedId = Number(id);
    const isDeleted = await new UserRepository().delete(parsedId);
    if (!isDeleted) {
      reply.status(404).send({
        message: RM.notFound(entityName, parsedId),
      });
    }
    reply.status(200).send({
      message: RM.delete(entityName, parsedId),
    });
  }
}
