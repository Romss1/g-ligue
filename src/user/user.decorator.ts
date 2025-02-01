import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import { User as UserType} from "@prisma/client";

export const UserDecorator = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        return request.user as UserType
      },
);