import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../../../application/data/database/sql/repositories/order.repository';
import { Order } from '../../../application/data/database/sql/models/order.model';
import { CreateOrderDto } from '../../../application/data/dto/order/create-order.dto';
import { UpdateOrderDto } from '../../../application/data/dto/order/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepository.findAll({
      order: [['id', 'DESC']],
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findByPk(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderRepository.create(createOrderDto);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const updatedOrder = await this.orderRepository.update(id, updateOrderDto);
    if (!updatedOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return updatedOrder;
  }

  async remove(id: number): Promise<void> {
    const deleted = await this.orderRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }
}
