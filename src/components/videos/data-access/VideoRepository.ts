import getDBConnection from '../../../database/config';
import { Video } from './model';
import BaseRepository from '../../../generators/BaseRepository';

export default class VideoRepository extends BaseRepository<Video> {
  constructor() {
    super(getDBConnection()('videos'));
  }
}
