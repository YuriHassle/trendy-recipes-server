import { Static, Type } from '@sinclair/typebox';

export const BaseQuery = Type.Object({
  limit: Type.Optional(Type.Number()),
  offset: Type.Optional(Type.Number()),
  orderBy: Type.Optional(Type.String()),
  orderDirection: Type.Optional(Type.String({ enum: ['asc', 'desc'] })),
});

export type BaseQueryType = Static<typeof BaseQuery>;
