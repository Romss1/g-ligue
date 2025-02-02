import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { JoinClubService } from './join-club.service';
import { Auth } from 'src/auth/auth.decorator';
import { User } from '@prisma/client';
import { UserDecorator } from 'src/user/user.decorator';
import { CreateJoinClubRequestDTO } from './dto/create.join.club.request.dto';
import { Role } from 'src/auth/enum/role.enum';

@Controller('join-clubs')
export class JoinClubController {
  constructor(private readonly joinClubRequestService: JoinClubService) {}

  @Auth(Role.USER)
  @Post()
  async create(
    @Body() createJoinClubRequestDto: CreateJoinClubRequestDTO,
    @UserDecorator() { id }: User,
  ): Promise<void> {
    return this.joinClubRequestService.requestToJoinClub(
      createJoinClubRequestDto,
      id,
    );
  }

  @Auth(Role.ADMIN)
  @Patch(':clubId/:joinClubId/accept')
  async acceptJoin(@Param('joinClubId') joinClubId: string): Promise<void> {
    return this.joinClubRequestService.acceptToJoinClub(joinClubId);
  }

  @Auth(Role.ADMIN)
  @Patch(':clubId/:joinClubId/reject')
  async rejectJoin(@Param('joinClubId') joinClubId: string): Promise<void> {
    return this.joinClubRequestService.rejectToJoinClub(joinClubId);
  }
}
