import { Type } from '@sinclair/typebox';
import BaseSchema from '../../../common/BaseSchema';

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

export type LanguageType = typeof Language;
export type LanguagesType = typeof Languages;
export type LanguageBodyAddType = typeof LanguageBodyAdd;
export type LanguageBodyUpdateType = typeof LanguageBodyUpdate;

export default class LanguageSchema extends BaseSchema<
  LanguageType,
  LanguagesType,
  LanguageBodyAddType,
  LanguageBodyUpdateType
> {
  constructor() {
    super({
      replySingle: Language,
      replyAll: Languages,
      bodyAdd: LanguageBodyAdd,
      bodyUpdate: LanguageBodyUpdate,
    });
  }
}
