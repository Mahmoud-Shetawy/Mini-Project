import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { JwtService } from '../services/jwt.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtGuard implements CanActivate {
  private readonly logger = new Logger(JwtGuard.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    this.logger.log(`Authorization header: ${request.headers.authorization}`);
    this.logger.log(`Extracted token: ${token ? 'Token found' : 'No token'}`);

    if (!token) {
      this.logger.warn('No token provided');
      return false;
    }

    try {
      const payload = this.jwtService.verifyToken(token);
      this.logger.log(`Token payload: ${JSON.stringify(payload)}`);

      const user = await this.authService.validateUser(payload.sub);
      this.logger.log(`User found: ${user ? 'Yes' : 'No'}`);

      if (!user) {
        this.logger.warn(`User with ID ${payload.sub} not found`);
        return false;
      }

      request.user = user;
      this.logger.log('Authentication successful');
      return true;
    } catch (error) {
      this.logger.error(`Token verification failed: ${error.message}`);
      return false;
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
