import getDBConnection from '../../../database/config';
import { Recipe } from './model';
import BaseRepository from '../../../generators/BaseRepository';

export default class UserRepository extends BaseRepository<Recipe> {
  constructor() {
    super(getDBConnection()('recipes'));
  }
}
