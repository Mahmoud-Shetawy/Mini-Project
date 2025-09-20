import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtService } from './services/jwt.service';
import { JwtGuard } from './guards/jwt.guard';
import { UserRepository } from '../../application/data/database/sql/repositories/user.repository';
import { DBModule } from '../../application/data/database/sql/db.module';

@Module({
  imports: [DBModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtGuard, UserRepository],
  exports: [AuthService, JwtService, JwtGuard],
})
export class AuthModule {}
