import { Body, Controller, Post } from '@nestjs/common';
import { JoinClubService } from './join-club.service';
import { Auth } from 'src/auth/auth.decorator';
import { Role, User } from '@prisma/client';
import { UserDecorator } from 'src/user/user.decorator';
import { CreateJoinClubRequestDTO } from './dto/create.join.club.request.dto';

@Controller('join-clubs')
export class JoinClubController {
    constructor(private readonly joinClubRequestService: JoinClubService){}

    @Auth(Role.USER)
    @Post()
    async create(
        @Body() createJoinClubRequestDto: CreateJoinClubRequestDTO,
        @UserDecorator() { id }: User
    ): Promise<void> {
        return this.joinClubRequestService.requestToJoinClub(createJoinClubRequestDto, id);
    }
}
