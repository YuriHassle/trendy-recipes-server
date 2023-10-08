import getDBConnection from '../../../database/config';
import { LanguageType, LanguagesType } from '../domain/LanguageSchema';
import BaseRepository from '../../../common/BaseRepository';

export default class LanguageRepository extends BaseRepository<
  LanguageType,
  LanguagesType
> {
  constructor() {
    super(getDBConnection()<LanguageType, LanguagesType>('languages'));
  }
}
