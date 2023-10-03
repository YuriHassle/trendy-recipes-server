import getDBConnection from '../../../database/config';
import { UserType, UsersType } from '../domain/UserSchema';
import BaseRepository from '../../../common/BaseRepository';

export default class UserRepository extends BaseRepository<
  UserType,
  UsersType
> {
  constructor() {
    super(getDBConnection()<UserType, UsersType>('users'));
  }

  async findByEmail(email: string) {
    return this.entity.select('*').where({ email }).first();
  }
}
