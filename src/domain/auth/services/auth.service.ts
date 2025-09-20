import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../application/data/database/sql/repositories/user.repository';
import { User } from '../../../application/data/database/sql/models/user.model';
import { RegisterDto } from '../../../application/data/dto/auth/register.dto';
import { LoginDto } from '../../../application/data/dto/auth/login.dto';
import { AuthResponseDto } from '../../../application/data/dto/auth/auth-response.dto';
import { JwtService } from './jwt.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<{ success: boolean; message: string; data?: AuthResponseDto }> {
    const existingUser = await this.userRepository.findByEmail(
      registerDto.email,
    );
    if (existingUser) {
      return {
        success: false,
        message: 'User with this email already exists',
      };
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.userRepository.create({
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
    });

    const token = this.jwtService.generateToken({
      sub: user.id,
      email: user.email,
    });

    return {
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
        },
        token,
      },
    };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ success: boolean; message: string; data?: AuthResponseDto }> {
    const user = await this.userRepository.findByEmail(loginDto.email);
    if (!user) {
      return {
        success: false,
        message: 'Invalid credentials',
      };
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Invalid credentials',
      };
    }

    const token = this.jwtService.generateToken({
      sub: user.id,
      email: user.email,
    });

    return {
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
        },
        token,
      },
    };
  }

  async validateUser(userId: number): Promise<User | null> {
    const user = await this.userRepository.findByPk(userId);
    return user;
  }
}
