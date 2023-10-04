import { Type } from '@sinclair/typebox';
import {
  FastifyReply,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';
import { RouteGenericInterface } from 'fastify/types/route';

export const BaseQuery = Type.Object({
  limit: Type.Optional(Type.String()),
  offset: Type.Optional(Type.String()),
  orderBy: Type.Optional(Type.String()),
  orderDirection: Type.Optional(Type.String({ enum: ['asc', 'desc'] })),
});

export const BaseParam = Type.Object({
  id: Type.String(),
});

export const BaseMessage = Type.Object({
  message: Type.String(),
});

export type BaseQueryType = typeof BaseQuery;
export type BaseParamType = typeof BaseParam;
export type BaseMessageType = typeof BaseMessage;

export interface FastifyCustomReply<CustomReply extends RouteGenericInterface>
  extends FastifyReply<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    CustomReply
  > {}

export default class BaseSchema<
  ReplySingle,
  ReplyAll,
  BodyAdd,
  BodyUpdate,
  ReplyMessage = BaseMessageType,
  Params = BaseParamType,
  Query = BaseQueryType,
> {
  readonly replySingle: ReplySingle;
  readonly replyAll?: ReplyAll;
  readonly bodyAdd?: BodyAdd;
  readonly bodyUpdate?: BodyUpdate;
  readonly replyMessage?: ReplyMessage | BaseMessageType;
  readonly params?: Params | BaseParamType;
  readonly query?: Query | BaseQueryType;

  constructor({
    replySingle,
    replyAll,
    bodyAdd,
    bodyUpdate,
    replyMessage = BaseMessage,
    params = BaseParam,
    query = BaseQuery,
  }: {
    replySingle: ReplySingle;
    replyAll?: ReplyAll;
    bodyAdd?: BodyAdd;
    bodyUpdate?: BodyUpdate;
    replyMessage?: ReplyMessage | BaseMessageType;
    params?: Params | BaseParamType;
    query?: Query | BaseQueryType;
  }) {
    this.replySingle = replySingle;
    this.replyAll = replyAll;
    this.bodyAdd = bodyAdd;
    this.bodyUpdate = bodyUpdate;
    this.replyMessage = replyMessage;
    this.params = params;
    this.query = query;
  }

  getFindAllSchema() {
    return {
      querystring: this.query,
      response: {
        200: this.replyAll,
      },
    };
  }

  getCreateSchema() {
    return {
      body: this.bodyAdd,
      response: {
        201: this.replySingle,
      },
    };
  }

  getUpdateSchema() {
    return {
      params: this.params,
      body: this.bodyUpdate,
      response: {
        200: this.replySingle,
        400: this.replyMessage,
      },
    };
  }

  getDeleteSchema() {
    return {
      params: this.params,
      response: {
        200: this.replyMessage,
        400: this.replyMessage,
      },
    };
  }
}
