import { User } from '../models/user.model';
import { BaseRepository } from './base.repository';
import { Injectable, Inject } from '@nestjs/common';
import { ModelCtor, Sequelize } from 'sequelize-typescript';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@Inject('SEQUELIZE') sequelize: Sequelize) {
    super(sequelize);
  }

  getModel(): ModelCtor<User> {
    return User;
  }
}
