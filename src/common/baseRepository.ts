import { Knex } from 'knex';

export default class BaseRepository<T> {
  readonly entity: Knex.QueryBuilder;

  constructor(entity: Knex.QueryBuilder) {
    this.entity = entity;
  }

  async findAll({
    limit = 10,
    offset = 0,
    orderBy = 'updated_at',
    orderDirection = 'desc',
  } = {}): Promise<T[]> {
    return this.entity
      .select('*')
      .limit(limit)
      .offset(offset)
      .orderBy(orderBy, orderDirection);
  }

  async findById(id: number): Promise<T> {
    return this.entity.select('*').where({ id }).first();
  }

  async create(payload: Partial<T>): Promise<number[]> {
    return this.entity.insert(payload);
  }

  async update(id: number, payload: Partial<T>): Promise<number> {
    return this.entity.update(payload).where({ id });
  }

  async delete(id: number): Promise<number> {
    return this.entity.delete().where({ id });
  }
}
