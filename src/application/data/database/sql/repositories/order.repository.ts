import { Order } from '../models/order.model';
import { BaseRepository } from './base.repository';
import { Injectable, Inject } from '@nestjs/common';
import { ModelCtor, Sequelize } from 'sequelize-typescript';

@Injectable()
export class OrderRepository extends BaseRepository<Order> {
  constructor(@Inject('SEQUELIZE') sequelize: Sequelize) {
    super(sequelize);
  }

  getModel(): ModelCtor<Order> {
    return Order;
  }

  async findByPk(id: number, options: any = {}): Promise<Order | null> {
    return this.model.findByPk(id, options);
  }

  async findAll(options: any = {}): Promise<Order[]> {
    return this.model.findAll(options);
  }
}
