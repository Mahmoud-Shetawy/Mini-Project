import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { OrderRepository } from '../../../application/data/database/sql/repositories/order.repository';
import { UserRepository } from '../../../application/data/database/sql/repositories/user.repository';
import { Order } from '../../../application/data/database/sql/models/order.model';
import { CreateOrderDto } from '../../../application/data/dto/order/create-order.dto';
import { UpdateOrderDto } from '../../../application/data/dto/order/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async findAllByUser(userId: number): Promise<Order[]> {
    return this.orderRepository.findAll({
      where: { userId },
      order: [['id', 'DESC']],
      include: [
        {
          model: this.userRepository.getModel(),
          as: 'user',
          attributes: ['name'],
        },
      ],
    });
  }

  async findOneByUser(id: number, userId: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id, userId },
      include: [
        {
          model: this.userRepository.getModel(),
          as: 'user',
          attributes: ['name'],
        },
      ],
    });
    if (!order) {
      throw new NotFoundException(
        `Order with ID ${id} not found or you don't have permission to access it`,
      );
    }
    return order;
  }

  async create(createOrderDto: CreateOrderDto, userId: number): Promise<Order> {
    // Validate that the user exists
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      throw new BadRequestException(`User with ID ${userId} not found`);
    }

    // Add userId to the createOrderDto
    const orderData = {
      ...createOrderDto,
      userId,
    };

    const order = await this.orderRepository.create(orderData);

    // Return the order with populated user data
    return this.findOneByUser(order.id, userId);
  }

  async updateByUser(
    id: number,
    updateOrderDto: UpdateOrderDto,
    userId: number,
  ): Promise<Order> {
    // First check if the order belongs to the user
    const existingOrder = await this.orderRepository.findOne({
      where: { id, userId },
    });

    if (!existingOrder) {
      throw new NotFoundException(
        `Order with ID ${id} not found or you don't have permission to update it`,
      );
    }

    // If userId is being updated, validate that the new user exists
    if (updateOrderDto.userId) {
      const user = await this.userRepository.findByPk(updateOrderDto.userId);
      if (!user) {
        throw new BadRequestException(
          `User with ID ${updateOrderDto.userId} not found`,
        );
      }
    }

    const updatedOrder = await this.orderRepository.update(id, updateOrderDto);
    if (!updatedOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return updatedOrder;
  }

  async removeByUser(id: number, userId: number): Promise<void> {
    // First check if the order belongs to the user
    const existingOrder = await this.orderRepository.findOne({
      where: { id, userId },
    });

    if (!existingOrder) {
      throw new NotFoundException(
        `Order with ID ${id} not found or you don't have permission to delete it`,
      );
    }

    const deleted = await this.orderRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }
}
