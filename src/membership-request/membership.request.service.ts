import { HttpCode, HttpException, Injectable } from '@nestjs/common';
import { CreateMembershipRequestDTO } from './dto/create.membership.request.dto';
import { PrismaService } from 'src/prisma.service';
import { ClubJoinRequest, JoinClubRequestStatus, Prisma } from '@prisma/client';
import { Role } from 'src/auth/enum/role.enum';

@Injectable()
export class MembershipRequestService {
  constructor(private readonly prisma: PrismaService) { }

  async createRequest(
    clubId: string,
    userId: string,
    message: string|null
  ): Promise<void> {
    try {
      await this.prisma.clubJoinRequest.create({
        data: {
          userId: userId,
          clubId: clubId,
          message: message,
        },
      });
    } catch {
      throw new HttpException('Cette demande de rejoindre le club existe déjà', 409);
    }
  }

  async acceptRequest(clubJoinRequestId: string): Promise<void> {
    try {
      const joinClubRequest: ClubJoinRequest = await this.prisma.clubJoinRequest.update({
        where: {
          id: clubJoinRequestId,
          status: JoinClubRequestStatus.PENDING
        },
        data: {
          status: JoinClubRequestStatus.APPROVED,
        },
      });

      await this.prisma.clubRole.create({
        data: {
          role: Role.MEMBER,
          clubId: joinClubRequest.clubId,
          userId: joinClubRequest.userId
        }
      });
    } catch {
      throw new HttpException('La requête a déjà été traité', 409)
    }
  }

  async rejectRequest(joinClubRequestId: string): Promise<void> {
    try {
      await this.prisma.clubJoinRequest.update({
        where: {
          id: joinClubRequestId,
          status: JoinClubRequestStatus.PENDING
        },
        data: {
          status: JoinClubRequestStatus.REJECTED,
        },
      });
    } catch {
      throw new HttpException('La requête a déjà été traité', 409)
    }
  }
}
