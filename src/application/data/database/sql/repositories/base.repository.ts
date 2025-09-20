import { Model, Sequelize, ModelCtor } from 'sequelize-typescript';

export abstract class BaseRepository<T extends Model> {
  protected model: ModelCtor<T>;

  protected constructor(protected readonly sequelize: Sequelize) {
    this.model = this.getModel();
  }

  abstract getModel(): ModelCtor<T>;

  async findAll(options: any = {}): Promise<T[]> {
    return this.model.findAll(options);
  }

  async findOne(options: any = {}): Promise<T | null> {
    return this.model.findOne(options);
  }

  async findByPk(id: number): Promise<T | null> {
    return this.model.findByPk(id);
  }

  async findByEmail(email: string): Promise<T | null> {
    return this.model.findOne({
      where: { email },
    } as any);
  }

  async create(data: any): Promise<T> {
    return this.model.create(data);
  }

  async update(id: number, data: any): Promise<T | null> {
    const record = await this.findByPk(id);
    if (!record) return null;

    await record.update(data);
    return record;
  }

  async delete(id: number): Promise<boolean> {
    const record = await this.findByPk(id);
    if (!record) return false;

    await record.destroy();
    return true;
  }
}

export default BaseRepository;
