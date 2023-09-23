import getDBConnection from '../../../database/config';

export async function findAll() {
  const db = getDBConnection();
  return db.select('*').from('users');
}
