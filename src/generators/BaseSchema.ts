import {
  FastifyReply,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';
import { RouteGenericInterface } from 'fastify/types/route';
import { DefaultMessage, DefaultParam, DefaultQuery } from '../utils/schemas';

export interface FastifyCustomReply<CustomReply extends RouteGenericInterface>
  extends FastifyReply<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    CustomReply
  > {}

export default class BaseSchema<
  ReplySingle,
  ReplyMany,
  BodyAdd,
  BodyUpdate,
  ReplyMessage = typeof DefaultMessage,
  Params = typeof DefaultParam,
  Query = typeof DefaultQuery,
> {
  readonly replySingle?: ReplySingle;
  readonly replyMany?: ReplyMany;
  readonly bodyAdd?: BodyAdd;
  readonly bodyUpdate?: BodyUpdate;
  readonly replyMessage?: ReplyMessage | typeof DefaultMessage;
  readonly params?: Params | typeof DefaultParam;
  readonly query?: Query | typeof DefaultQuery;

  constructor({
    replySingle,
    replyMany,
    bodyAdd,
    bodyUpdate,
    replyMessage = DefaultMessage,
    params = DefaultParam,
    query = DefaultQuery,
  }: {
    replySingle?: ReplySingle;
    replyMany?: ReplyMany;
    bodyAdd?: BodyAdd;
    bodyUpdate?: BodyUpdate;
    replyMessage?: ReplyMessage | typeof DefaultMessage;
    params?: Params | typeof DefaultParam;
    query?: Query | typeof DefaultQuery;
  }) {
    this.replySingle = replySingle;
    this.replyMany = replyMany;
    this.bodyAdd = bodyAdd;
    this.bodyUpdate = bodyUpdate;
    this.replyMessage = replyMessage;
    this.params = params;
    this.query = query;
  }

  getFindOneSchema() {
    return {
      params: this.params,
      response: {
        200: this.replySingle,
        400: this.replyMessage,
      },
    };
  }

  getFindAllSchema() {
    return {
      querystring: this.query,
      response: {
        200: this.replyMany,
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
