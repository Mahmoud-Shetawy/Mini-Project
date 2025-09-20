import { Module } from '@nestjs/common';
import { OrdersModule } from './domain/orders/orders.module';

@Module({
  imports: [OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
