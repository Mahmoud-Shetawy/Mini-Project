import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../../../application/data/dto/create-order.dto';
import { UpdateOrderDto } from '../../../application/data/dto/update-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async orders() {
    return {
      message: 'Orders',
      data: await this.orderService.findAll(),
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'Order found successfully',
      data: await this.orderService.findOne(id),
    };
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return {
      message: 'wal-ya-wal,Order created successfully',
      data: await this.orderService.create(createOrderDto),
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    console.log(updateOrderDto);
    return {
      message: 'wal-ya-wal, Order updated successfully',
      data: await this.orderService.update(id, updateOrderDto),
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'wal-ya-wal, Order deleted successfully',
      data: await this.orderService.remove(id),
    };
  }
}
