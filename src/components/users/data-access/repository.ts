import getDBConnection from '../../../database/config';
import { UserType } from '../domain/schema';
import BaseRepository from '../../../common/baseRepository';

export default class UserRepository extends BaseRepository<UserType> {
  constructor() {
    super(getDBConnection()<UserType>('users'));
  }

  async findByEmail(email: string) {
    return this.entity.select('*').where({ email }).first();
  }
}
