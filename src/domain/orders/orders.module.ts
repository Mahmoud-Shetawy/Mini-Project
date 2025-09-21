import { Module } from '@nestjs/common';
import { OrdersService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { OrderRepository } from '../../application/data/database/sql/repositories/order.repository';
import { UserRepository } from '../../application/data/database/sql/repositories/user.repository';
import { DBModule } from '../../application/data/database/sql/db.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DBModule, AuthModule],
  controllers: [OrderController],
  providers: [OrdersService, OrderRepository, UserRepository],
})
export class OrdersModule {}
