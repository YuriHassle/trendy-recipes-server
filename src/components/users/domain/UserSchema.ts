import { Type } from '@sinclair/typebox';
import VM from '../../../common/ValidationMessages';
import BaseSchema from '../../../common/BaseSchema';

export const User = Type.Object({
  id: Type.Number(),
  language_id: Type.Number(),
  name: Type.String(),
  email: Type.String({ format: 'email' }),
  points: Type.Number(),
  avatar: Type.Optional(Type.String()),
  active: Type.Boolean(),
  created_at: Type.String(),
  updated_at: Type.String(),
});

export const Users = Type.Array(User);

export const UserBodyAdd = Type.Object({
  name: Type.String(),
  email: Type.String({
    format: 'email',
    minLength: 10,
    errorMessage: {
      format: VM.format('email'),
      minLength: VM.minLength('email', 5),
    },
  }),
  password: Type.String(),
  language_id: Type.Number(),
  points: Type.Optional(Type.Number()),
});

export const UserBodyUpdate = Type.Object({
  name: Type.Optional(Type.String()),
  email: Type.Optional(
    Type.String({
      format: 'email',
      minLength: 10,
      errorMessage: {
        format: VM.format('email'),
        minLength: VM.minLength('email', 5),
      },
    }),
  ),
  language_id: Type.Optional(Type.Number()),
});

export type UserType = typeof User;
export type UsersType = typeof Users;
export type UserBodyAddType = typeof UserBodyAdd;
export type UserBodyUpdateType = typeof UserBodyUpdate;

export default class UserSchema extends BaseSchema<
  UserType,
  UsersType,
  UserBodyAddType,
  UserBodyUpdateType
> {
  constructor() {
    super({
      replySingle: User,
      replyAll: Users,
      bodyAdd: UserBodyAdd,
      bodyUpdate: UserBodyUpdate,
    });
  }
}
