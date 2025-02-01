import { Injectable } from '@nestjs/common';
import { CreateJoinClubRequestDTO } from './dto/create.join.club.request.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JoinClubService {
    constructor(private readonly prisma: PrismaService){}

    async requestToJoinClub(createJoinClubRequestDTO: CreateJoinClubRequestDTO, userId: string): Promise<void> {
        await this.prisma.clubJoinRequest.create({ 
            data: {
                userId: userId,
                clubId: createJoinClubRequestDTO.clubId,
                message: createJoinClubRequestDTO.message
            } 
        })
    }
}
