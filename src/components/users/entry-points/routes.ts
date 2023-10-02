import { FastifyInstance } from 'fastify';
import UserService from '../domain/UserService';
import {
  User,
  Users,
  UserType,
  UserBody,
  UserBodyType,
} from '../domain/schema';
import { BaseQuery, BaseQueryType } from '../../../common/baseSchema';

export default async function userRouter(fastify: FastifyInstance) {
  fastify.get<{ Querystring: BaseQueryType; Reply: UserType[] }>(
    '/',
    {
      schema: {
        querystring: BaseQuery,
        response: {
          200: Users,
        },
      },
    },
    new UserService().findAll,
  );

  fastify.post<{ Body: UserBodyType; Reply: UserType }>(
    '/',
    {
      schema: {
        body: UserBody,
        response: {
          201: User,
        },
      },
    },
    new UserService().create,
  );
}
