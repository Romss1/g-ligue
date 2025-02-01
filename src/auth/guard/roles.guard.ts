import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ClubRole, Prisma, Role } from "@prisma/client";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { clubId } = request.params;
        const requiredRoles = this.reflector.get<ClubRole[]>('roles', context.getHandler());
        const userRole: ClubRole = request.user['clubRoles'];

        if (!userRole[clubId]) {
            throw new ForbiddenException(`L'utilisateur n'a pas de rôle pour ce club.`);
        }

        if(!requiredRoles.includes(userRole[clubId])){
            throw new ForbiddenException();
        }

        return true;
    }
}