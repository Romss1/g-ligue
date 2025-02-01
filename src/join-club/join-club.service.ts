import { Injectable } from '@nestjs/common';
import { CreateJoinClubRequestDTO } from './dto/create.join.club.request.dto';
import { PrismaService } from 'src/prisma.service';
import { JoinClubModule } from './join-club.module';
import { JoinClubRequestStatus } from '@prisma/client';

@Injectable()
export class JoinClubService {
    constructor(private readonly prisma: PrismaService) { }

    async requestToJoinClub(createJoinClubRequestDTO: CreateJoinClubRequestDTO, userId: string): Promise<void> {
        await this.prisma.clubJoinRequest.create({
            data: {
                userId: userId,
                clubId: createJoinClubRequestDTO.clubId,
                message: createJoinClubRequestDTO.message
            }
        })
    }

    async acceptToJoinClub(joinClubRequestId: string): Promise<void> {
        await this.prisma.clubJoinRequest.update({
            where: {
                id: joinClubRequestId
            },
            data: {
                status: JoinClubRequestStatus.APPROVED
            }
        })
    }

    async rejectToJoinClub(joinClubRequestId: string): Promise<void> {
        await this.prisma.clubJoinRequest.update({
            where: {
                id: joinClubRequestId
            },
            data: {
                status: JoinClubRequestStatus.REJECTED
            }
        })
    }
}
