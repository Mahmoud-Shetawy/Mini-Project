import { Routes } from '@nestjs/core';
import { OrdersModule } from '../orders.module';
export const orderRoute: Routes = [
  {
    path: '/orders/:id/admin',
    children: [OrdersModule],
  },
];
