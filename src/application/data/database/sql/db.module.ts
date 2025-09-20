import { Module } from '@nestjs/common';
import { OrderRepository } from './repositories/order.repository';
import { Order } from './models/order.model';
import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user.model';
import { UserRepository } from './repositories/user.repository';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST ?? 'localhost',
        port: Number(process.env.DB_PORT ?? 3306),
        username: process.env.DB_USERNAME ?? 'root',
        password: process.env.DB_PASSWORD ?? 'Sheto!123',
        database: process.env.DB_NAME ?? 'mini_project',
      });
      sequelize.addModels([Order, User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];

@Module({
  providers: [...databaseProviders, OrderRepository, UserRepository],
  exports: [...databaseProviders, OrderRepository, UserRepository],
})
export class DBModule {}
