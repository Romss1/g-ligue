import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { MembershipRequestService } from './membership.request.service';
import { Auth } from 'src/auth/auth.decorator';
import { User } from '@prisma/client';
import { UserDecorator } from 'src/user/user.decorator';
import { CreateMembershipRequestDTO } from './dto/create.membership.request.dto';
import { Role } from 'src/auth/enum/role.enum';
import { MembershipRequestResponseDTO } from './dto/response/membership.request.dto';

@Controller('clubs/:clubId/membership-requests')
export class MembershipRequestController {
  constructor(private readonly membershipRequestService: MembershipRequestService) {}

  @Auth(Role.USER)
  @Post()
  async create(
    @Param('clubId') clubId: string,
    @UserDecorator() { id: userId }: User,
    @Body() { message }: CreateMembershipRequestDTO,
  ): Promise<void> {
    return this.membershipRequestService.createRequest(
      clubId,
      userId,
      message
    );
  }

  @Auth(Role.ADMIN)
  @Get()
  async getAllMembershipRequests(): Promise<MembershipRequestResponseDTO[]> {
    return await this.membershipRequestService.getAllMembershipRequests();
  }

  @Auth(Role.ADMIN)
  @Patch(':requestId/accept')
  async acceptRequest(@Param('requestId') requestId: string): Promise<void> {
    return this.membershipRequestService.acceptRequest(requestId);
  }

  @Auth(Role.ADMIN)
  @Patch(':requestId/reject')
  async rejectRequest(@Param('requestId') requestId: string): Promise<void> {
    return this.membershipRequestService.rejectRequest(requestId);
  }
}
