import { Static, Type } from '@sinclair/typebox';
import BaseSchema from '../../../generators/BaseSchema';

export const Language = Type.Object({
  id: Type.Number(),
  slug: Type.String(),
  name: Type.String(),
  active: Type.Boolean(),
  created_at: Type.String(),
  updated_at: Type.String(),
});

export const Languages = Type.Array(Language);

export const LanguageBodyAdd = Type.Object({
  slug: Type.String(),
  name: Type.String(),
});

export const LanguageBodyUpdate = Type.Object({
  slug: Type.Optional(Type.String()),
  name: Type.Optional(Type.String()),
});

export type LanguageType = Static<typeof Language>;
export type LanguageBodyAddType = Static<typeof LanguageBodyAdd>;
export type LanguageBodyUpdateType = Static<typeof LanguageBodyUpdate>;

export default class LanguageSchema extends BaseSchema<
  typeof Language,
  typeof Languages,
  typeof LanguageBodyAdd,
  typeof LanguageBodyUpdate
> {
  constructor() {
    super({
      replySingle: Language,
      replyMany: Languages,
      bodyAdd: LanguageBodyAdd,
      bodyUpdate: LanguageBodyUpdate,
    });
  }
}
