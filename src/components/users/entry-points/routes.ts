import { FastifyInstance } from 'fastify';
import UserService from '../domain/UserService';
import {
  User,
  Users,
  UserType,
  UserBodyAdd,
  UserBodyAddType,
  UserBodyUpdate,
  UserBodyUpdateType,
} from '../domain/schema';
import {
  BaseQuery,
  BaseQueryType,
  BaseParam,
  BaseParamType,
} from '../../../common/baseSchema';

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

  fastify.post<{ Body: UserBodyAddType; Reply: UserType }>(
    '/',
    {
      schema: {
        body: UserBodyAdd,
        response: {
          201: User,
        },
      },
    },
    new UserService().create,
  );

  fastify.put<{
    Body: UserBodyUpdateType;
    Reply: UserType;
    Params: BaseParamType;
  }>(
    '/:id',
    {
      schema: {
        params: BaseParam,
        body: UserBodyUpdate,
        response: {
          200: User,
        },
      },
    },
    new UserService().update,
  );
}
