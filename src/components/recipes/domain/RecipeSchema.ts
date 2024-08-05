import { Static, Type } from '@sinclair/typebox';
import BaseSchema from '../../../generators/BaseSchema';
import { VideoBodyAdd, Video } from '../../videos/domain/VideoSchema';

export const Recipe = Type.Object({
  id: Type.Number(),
  user_id: Type.Number(),
  video_id: Type.Number(),
  video: Type.Optional(Video),
  language_id: Type.Number(),
  title: Type.String(),
  description: Type.String(),
  ingredients: Type.String(),
  preparation: Type.String(),
  active: Type.Boolean(),
  created_at: Type.String(),
  updated_at: Type.String(),
});

export const Recipes = Type.Array(Recipe);

export const RecipeBodyAdd = Type.Object({
  user_id: Type.Number(),
  video_id: Type.Optional(Type.Number()),
  video: Type.Optional(VideoBodyAdd),
  language_id: Type.Number(),
  title: Type.String(),
  description: Type.Optional(Type.String()),
  ingredients: Type.String(),
  preparation: Type.Optional(Type.String()),
});

export const RecipeBodyUpdate = Type.Object({
  title: Type.Optional(Type.String()),
  description: Type.Optional(Type.String()),
  ingredients: Type.Optional(Type.String()),
  preparation: Type.Optional(Type.String()),
});

export type RecipeType = Static<typeof Recipe>;
export type RecipeBodyAddType = Static<typeof RecipeBodyAdd>;
export type RecipeBodyUpdateType = Static<typeof RecipeBodyUpdate>;

export default class RecipeSchema extends BaseSchema<
  typeof Recipe,
  typeof Recipes,
  typeof RecipeBodyAdd,
  typeof RecipeBodyUpdate
> {
  constructor() {
    super({
      replySingle: Recipe,
      replyMany: Recipes,
      bodyAdd: RecipeBodyAdd,
      bodyUpdate: RecipeBodyUpdate,
    });
  }
}
