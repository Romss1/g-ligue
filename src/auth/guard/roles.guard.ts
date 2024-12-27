import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "@prisma/client";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
        const userRole: Role = request.user['roles'];

        if(!requiredRoles.includes(userRole)){
            throw new ForbiddenException();
        }

        return true;
    }
}