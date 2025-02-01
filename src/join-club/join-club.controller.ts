import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { JoinClubService } from './join-club.service';
import { Auth } from 'src/auth/auth.decorator';
import { Role, User } from '@prisma/client';
import { UserDecorator } from 'src/user/user.decorator';
import { CreateJoinClubRequestDTO } from './dto/create.join.club.request.dto';

@Controller('join-clubs')
export class JoinClubController {
    constructor(private readonly joinClubRequestService: JoinClubService){}

    @Auth(Role.MEMBER)
    @Post()
    async create(
        @Body() createJoinClubRequestDto: CreateJoinClubRequestDTO,
        @UserDecorator() { id }: User
    ): Promise<void> {
        return this.joinClubRequestService.requestToJoinClub(createJoinClubRequestDto, id);
    }

    // TODO Ajouter le check: update seulement si le status = Pending
    // TODO: Avoir un Role CLUB_ADMIN
    @Auth(Role.MEMBER)
    @Patch(':id/accept')
    async acceptJoin(
        @Param('id') id: string
    ): Promise<void> {
        return this.joinClubRequestService.acceptToJoinClub(id);
    }

    // TODO Ajouter le check: update seulement si le status = Pending
    // TODO: Avoir un Role CLUB_ADMIN
    @Auth(Role.MEMBER)
    @Patch(':id/reject')
    async rejectJoin(
        @Param('id') id: string
    ): Promise<void> {
        return this.joinClubRequestService.rejectToJoinClub(id);
    }
}