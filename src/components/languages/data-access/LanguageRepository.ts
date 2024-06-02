import getDBConnection from '../../../database/config';
import { Language } from './model';
import BaseRepository from '../../../generators/BaseRepository';

export default class LanguageRepository extends BaseRepository<Language> {
  constructor() {
    super(getDBConnection()('languages'));
  }
}
