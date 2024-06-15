import getDBConnection from '../../../database/config';
import { Recipe } from './model';
import BaseRepository, { CreateParams } from '../../../generators/BaseRepository';
import { VideoBodyAddType } from '../../videos/domain/VideoSchema';

interface CreateRecipeParams extends CreateParams<Recipe> {
  video?: VideoBodyAddType;
}
export default class RecipeRepository extends BaseRepository<Recipe> {
  constructor() {
    super(getDBConnection()('recipes'));
  }

  async create(params: CreateRecipeParams): Promise<Recipe[]> {
    try {
      return getDBConnection().transaction(async (trx) => {
        const { video, payload } = params;

        if (video) {
          const videoEntity = getDBConnection()('videos');
          // check if a video with the same url already exists
          const [videoFound] = await videoEntity.select('id').where({ url: video.url });

          if (videoFound) {
            // check if a recipe with the same video_id and language_id already exists
            const [recipeFound] = await this.entity
              .select('id')
              .where({ video_id: videoFound.id, language_id: payload.language_id });

            // must return error if there's a recipe with the same video_id and language_id
            if (recipeFound) {
              throw new Error('Recipe with the same video and language already exists');
            }

            params.payload.video_id = videoFound.id;
          } else {
            const [result] = await videoEntity
              .insert({ url: video.url, source: video.source })
              .returning('id')
              .transacting(trx);
            params.payload.video_id = result.id;
          }
        }

        return this.entity
          .insert(params.payload)
          .returning(params.returningFields)
          .transacting(trx);
      });
    } catch (error) {
      throw new Error(`Error creating recipe: ${error}`);
    }
  }
}
