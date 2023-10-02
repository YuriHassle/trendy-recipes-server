import UserRepository from '../data-access/repository';
import { FastifyRequest, FastifyReply } from 'fastify';
import { BaseQueryType } from '../../../common/baseSchema';
import { UserBodyType } from './schema';

export default class UserService {
  async findAll(
    request: FastifyRequest<{ Querystring: BaseQueryType }>,
    reply: FastifyReply,
  ) {
    const { limit, offset, orderBy, orderDirection } = request.query;
    const users = await new UserRepository().findAll({
      limit,
      offset,
      orderBy,
      orderDirection,
    });
    reply.status(200).send(users);
  }

  async create(
    request: FastifyRequest<{ Body: UserBodyType }>,
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
}
