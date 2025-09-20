import { Module } from '@nestjs/common';
import { OrdersModule } from './domain/orders/orders.module';
import { AuthModule } from './domain/auth/auth.module';

@Module({
  imports: [OrdersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
