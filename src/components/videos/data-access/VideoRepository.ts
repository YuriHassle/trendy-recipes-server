import getDBConnection from '../../../database/config';
import { VideoType, VideosType } from '../domain/VideoSchema';
import BaseRepository from '../../../common/BaseRepository';

export default class VideoRepository extends BaseRepository<
  VideoType,
  VideosType
> {
  constructor() {
    super(getDBConnection()<VideoType, VideosType>('videos'));
  }
}
