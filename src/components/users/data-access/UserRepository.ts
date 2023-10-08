import getDBConnection from '../../../database/config';
import { User } from './model';
import BaseRepository from '../../../generators/BaseRepository';

export default class UserRepository extends BaseRepository<User> {
  constructor() {
    super(getDBConnection()('users'));
  }

  async findByEmail(email: string) {
    return this.entity.select('*').where({ email }).first();
  }
}
