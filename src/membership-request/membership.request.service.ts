import { HttpCode, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MembershipRequest, MembershipRequestStatus, Prisma, User } from '@prisma/client';
import { Role } from 'src/auth/enum/role.enum';
import { MembershipRequestResponseDTO } from './dto/response/membership.request.dto';
import { UserInformationsDTO } from './dto/response/user.informations.dto';

@Injectable()
export class MembershipRequestService {
  constructor(private readonly prisma: PrismaService) { }

  async createRequest(
    clubId: string,
    userId: string,
    message: string|null
  ): Promise<void> {
    try {
      await this.prisma.membershipRequest.create({
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

  async getAllMembershipRequests(): Promise<MembershipRequestResponseDTO[]> {
    const membershipRequests = await this.prisma.membershipRequest.findMany({
      include: { user: true }
    });

    return membershipRequests.map(
      (membershipRequest) =>
        new MembershipRequestResponseDTO(
          membershipRequest.id,
          new UserInformationsDTO(membershipRequest.user.id, membershipRequest.user.lastName, membershipRequest.user.firstName),
          membershipRequest.message,
          membershipRequest.createdAt,
          membershipRequest.updatedAt
        )
    )
  }

  async acceptRequest(requestId: string): Promise<void> {
    try {
      const joinClubRequest = await this.prisma.membershipRequest.update({
        where: {
          id: requestId,
          status: MembershipRequestStatus.PENDING
        },
        data: {
          status: MembershipRequestStatus.APPROVED,
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

  async rejectRequest(requestId: string): Promise<void> {
    try {
      await this.prisma.membershipRequest.update({
        where: {
          id: requestId,
          status: MembershipRequestStatus.PENDING
        },
        data: {
          status: MembershipRequestStatus.REJECTED,
        },
      });
    } catch {
      throw new HttpException('La requête a déjà été traité', 409)
    }
  }
}
