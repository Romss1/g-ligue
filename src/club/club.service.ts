import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateClubRequestDTO } from './dto/create.club.request.dto';
import { ClubResponseDTO } from './dto/club.response.dto';
import { Role } from '@prisma/client';
import { CreateJoinClubRequestDTO } from '../join-club/dto/create.join.club.request.dto';

@Injectable()
export class ClubService {
    constructor(private readonly prisma: PrismaService){}

    async createClub(createClubRequestDto: CreateClubRequestDTO): Promise<string> {
        const club = await this.prisma.club.create({ data: createClubRequestDto })

        return club.id
    }

    async getAllClubs(): Promise<ClubResponseDTO[]> {
        const clubs = await this.prisma.club.findMany();

        return clubs.map((club) => new ClubResponseDTO(
            club.id,
            club.name,
            club.createdAt,
            club.updatedAt
        ));
    }

    async getClubByUuid(uuid: string): Promise<ClubResponseDTO> {
        const club = await this.prisma.club.findUnique({
            where: {
                id: uuid,
            }
        })

        return new ClubResponseDTO(
            club.id,
            club.name,
            club.createdAt,
            club.updatedAt
        )
    }

    async assignClubRole(userId: string, clubId: string, role: Role): Promise<void> {
        const clubRole = await this.prisma.clubRole.create({
            data: {
                userId,
                clubId,
                role
            }
        })
    }
}
