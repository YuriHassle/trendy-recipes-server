import { Knex } from 'knex';
import { DefaultQueryType } from '../utils/schemas';

interface CreateParams<Entity> {
  payload: Omit<Partial<Entity>, 'id'>;
  returningFields: Array<keyof Entity>;
}

interface UpdateParams<Entity> {
  id: number;
  payload: Omit<Partial<Entity>, 'id'>;
  returningFields: Array<keyof Entity>;
}
export default abstract class BaseRepository<Entity> {
  readonly entity: Knex.QueryBuilder;

  constructor(entity: Knex.QueryBuilder) {
    this.entity = entity;
  }

  async findAll(params: DefaultQueryType = {}): Promise<Entity[]> {
    const { limit = 10, offset = 0, orderBy = 'id', orderDirection = 'desc' } = params;
    return this.entity
      .select('*')
      .limit(Number(limit))
      .offset(Number(offset))
      .orderBy(orderBy, orderDirection);
  }

  async findById(id: number): Promise<Entity> {
    return this.entity.select('*').where({ id }).first();
  }

  async create(params: CreateParams<Entity>): Promise<Entity[]> {
    return this.entity
      .returning(params.returningFields as Array<string>)
      .insert(params.payload) as Promise<Entity[]>;
  }

  async update(params: UpdateParams<Entity>): Promise<Entity[]> {
    return this.entity
      .returning(params.returningFields as Array<string>)
      .update(params.payload)
      .where({ id: params.id }) as unknown as Promise<Entity[]>;
  }

  async delete(id: number): Promise<number> {
    return this.entity.del().where({ id });
  }
}
