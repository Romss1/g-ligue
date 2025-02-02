import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClubRole } from '@prisma/client';
import { Role } from '../enum/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );
    
    if (requiredRoles.includes(Role.USER)) {
        return true;
    }

    const request = context.switchToHttp().getRequest();
    const { clubId } = request.params;
    const userRole: ClubRole = request.user['clubRoles'];

    if (!userRole[clubId]) {
      throw new ForbiddenException(
        `L'utilisateur n'a pas de rôle pour ce club.`,
      );
    }

    if (!requiredRoles.includes(userRole[clubId])) {
      throw new ForbiddenException();
    }

    return true;
  }
}
