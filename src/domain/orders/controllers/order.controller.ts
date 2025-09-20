import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { OrdersService } from '../services/order.service';
import { CreateOrderDto } from '../../../application/data/dto/order/create-order.dto';
import { UpdateOrderDto } from '../../../application/data/dto/order/update-order.dto';
import { JwtGuard } from '../../auth/guards/jwt.guard';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  async findAll() {
    const orders = await this.orderService.findAll();
    return {
      success: true,
      message: 'Get all orders',
      data: orders,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const order = await this.orderService.findOne(id);
    return {
      success: true,
      message: `Get order with id: ${id}`,
      data: order,
    };
  }

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    if (!req.user) {
      return {
        success: false,
        message: 'Unauthorized access',
      };
    }

    createOrderDto.userId = req.user.id;

    const order = await this.orderService.create(createOrderDto);
    return {
      success: true,
      message: 'Order created successfully',
      data: order,
    };
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
    @Request() req,
  ) {
    if (!req.user) {
      return {
        success: false,
        message: 'Unauthorized access',
      };
    }

    try {
      const updatedOrder = await this.orderService.update(id, updateOrderDto);
      return {
        success: true,
        message: `Order with id: ${id} updated successfully`,
        data: updatedOrder,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          success: false,
          message: `Order with ID ${id} not found`,
        };
      }
      throw error;
    }
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    if (!req.user) {
      return {
        success: false,
        message: 'Unauthorized access',
      };
    }

    try {
      await this.orderService.remove(id);
      return {
        success: true,
        message: `Order with id: ${id} deleted successfully`,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          success: false,
          message: `Order with ID ${id} not found`,
        };
      }
      throw error;
    }
  }
}
