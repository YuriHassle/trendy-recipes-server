import UserRepository from '../data-access/UserRepository';
import { FastifyRequest, FastifyReply } from 'fastify';
import { BaseQueryType, BaseParamType } from '../../../common/baseSchema';
import { UserBodyAddType, UserBodyUpdateType } from './schema';

export default class UserService {
  async findAll(
    request: FastifyRequest<{ Querystring: BaseQueryType }>,
    reply: FastifyReply,
  ) {
    const { limit, offset, orderBy, orderDirection } = request.query;
    const users = await new UserRepository().findAll({
      limit: Number(limit) || undefined,
      offset: Number(offset) || undefined,
      orderBy,
      orderDirection,
    });
    reply.status(200).send(users);
  }

  async create(
    request: FastifyRequest<{ Body: UserBodyAddType }>,
    reply: FastifyReply,
  ) {
    const { email, name, password, points, language_id } = request.body;
    const userId = await new UserRepository().create({
      email,
      name,
      password,
      points,
      language_id,
    });
    const newUser = await new UserRepository().findById(userId[0]);
    reply.status(201).send(newUser);
  }

  async update(
    request: FastifyRequest<{
      Body: UserBodyUpdateType;
      Params: BaseParamType;
    }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params;
    const parsedId = Number(id);
    const { email, language_id, name, password } = request.body;
    await new UserRepository().update(parsedId, {
      email,
      name,
      password,
      language_id,
    });
    const updatedUser = await new UserRepository().findById(parsedId);
    reply.status(200).send(updatedUser);
  }
}
