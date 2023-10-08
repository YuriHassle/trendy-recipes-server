import { Static, Type } from '@sinclair/typebox';

enum OrderDirection {
  asc = 'asc',
  desc = 'desc',
}

export const DefaultQuery = Type.Object({
  limit: Type.Optional(Type.String()),
  offset: Type.Optional(Type.String()),
  orderBy: Type.Optional(Type.String()),
  orderDirection: Type.Optional(Type.Enum(OrderDirection)),
});

export const DefaultParam = Type.Object({
  id: Type.String(),
});

export const DefaultMessage = Type.Object({
  message: Type.String(),
});

export type DefaultQueryType = Static<typeof DefaultQuery>;
export type DefaultParamType = Static<typeof DefaultParam>;
export type DefaultMessageType = Static<typeof DefaultMessage>;
