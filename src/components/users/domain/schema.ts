import { Static, Type } from '@sinclair/typebox';

export const User = Type.Object({
  id: Type.Number(),
  language_id: Type.Number(),
  name: Type.String(),
  email: Type.String({ format: 'email' }),
  password: Type.String(),
  points: Type.Number(),
  avatar: Type.Optional(Type.String()),
  active: Type.Boolean(),
  created_at: Type.String(),
  updated_at: Type.String(),
});

export const Users = Type.Array(User);

export const UserBody = Type.Object({
  name: Type.String(),
  email: Type.String({ format: 'email' }),
  password: Type.String(),
  language_id: Type.Number(),
  points: Type.Optional(Type.Number()),
});

export const UserParams = Type.Object({
  id: Type.Number(),
});

export type UserType = Static<typeof User>;
export type UserParamsType = Static<typeof UserParams>;
export type UserBodyType = Static<typeof UserBody>;
