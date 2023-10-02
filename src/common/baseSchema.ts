import { Static, Type } from '@sinclair/typebox';

export const BaseQuery = Type.Object({
  limit: Type.Optional(Type.String()),
  offset: Type.Optional(Type.String()),
  orderBy: Type.Optional(Type.String()),
  orderDirection: Type.Optional(Type.String({ enum: ['asc', 'desc'] })),
});

export const BaseParam = Type.Object({
  id: Type.String(),
});

export type BaseQueryType = Static<typeof BaseQuery>;
export type BaseParamType = Static<typeof BaseParam>;
