import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import path from 'path';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @Get('/:userId')
    getUser(@Param('userId') userId: string) {
        return this.userService.getUser({ userId });
    }
}