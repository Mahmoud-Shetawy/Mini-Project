import { Module } from '@nestjs/common';
import { OrderController } from './controllers/order.controller';
import { DBModule } from '../../application/data/database/sql/db.module';
import { OrderService } from './services/order.service';

@Module({
  imports: [DBModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrdersModule {}
