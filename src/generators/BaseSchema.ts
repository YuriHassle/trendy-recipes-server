import {
  FastifyReply,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RequestGenericInterface,
} from 'fastify';
import { RouteGenericInterface } from 'fastify/types/route';
import {
  DefaultMessage,
  DefaultParam,
  DefaultQuery,
  DefaultParamType,
  DefaultQueryType,
} from '../utils/schemas';

export interface DefaultRequest<CustomBody = never> extends RequestGenericInterface {
  Body: CustomBody;
  Params: DefaultParamType;
  Querystring: DefaultQueryType;
}

export interface DefaultReply<CustomReply> extends DefaultRequest {
  Reply: CustomReply;
}
export interface FastifyCustomReply<DefaultReply extends RouteGenericInterface>
  extends FastifyReply<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    DefaultReply
  > {}

export default abstract class BaseSchema<
  ReplySingle,
  ReplyMany,
  BodyAdd,
  BodyUpdate,
  ReplyMessage = never,
  Params = never,
  Query = never,
> {
  readonly replySingle?: ReplySingle;
  readonly replyMany?: ReplyMany;
  readonly bodyAdd?: BodyAdd;
  readonly bodyUpdate?: BodyUpdate;
  readonly replyMessage: ReplyMessage | typeof DefaultMessage;
  readonly params: Params | typeof DefaultParam;
  readonly query: Query | typeof DefaultQuery;

  constructor({
    replySingle,
    replyMany,
    bodyAdd,
    bodyUpdate,
    replyMessage,
    params,
    query,
  }: {
    replySingle?: ReplySingle;
    replyMany?: ReplyMany;
    bodyAdd?: BodyAdd;
    bodyUpdate?: BodyUpdate;
    replyMessage?: ReplyMessage;
    params?: Params;
    query?: Query;
  }) {
    this.replySingle = replySingle;
    this.replyMany = replyMany;
    this.bodyAdd = bodyAdd;
    this.bodyUpdate = bodyUpdate;
    this.replyMessage = replyMessage || DefaultMessage;
    this.params = params || DefaultParam;
    this.query = query || DefaultQuery;
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
