import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'].split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    let user: any;
    try {
      user = await this.jwtService.verifyAsync(token);
    } catch (e) {
      throw new UnauthorizedException(e);
    }
    request.user = user;

    return true;
  }
}
