import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateClubRequestDTO } from './dto/create.club.request.dto';
import { ClubResponseDTO } from './dto/club.response.dto';
import { Role } from '@prisma/client';
import { CreateMembershipRequestDTO } from '../membership-request/dto/create.membership.request.dto';
import { UpdateClubDTO } from './dto/update.club.dto';

@Injectable()
export class ClubService {
  constructor(private readonly prisma: PrismaService) { }

  async createClub(
    createClubRequestDto: CreateClubRequestDTO,
  ): Promise<string> {
    const club = await this.prisma.club.create({ data: createClubRequestDto });

    return club.id;
  }

  async getAllClubs(): Promise<ClubResponseDTO[]> {
    const clubs = await this.prisma.club.findMany();

    return clubs.map(
      (club) =>
        new ClubResponseDTO(club.id, club.name, club.createdAt, club.updatedAt),
    );
  }

  async getClubById(uuid: string): Promise<ClubResponseDTO> {
    const club = await this.prisma.club.findUnique({
      where: {
        id: uuid,
      },
    });

    return new ClubResponseDTO(
      club.id,
      club.name,
      club.createdAt,
      club.updatedAt,
    );
  }

  async assignClubRole(
    userId: string,
    clubId: string,
    role: Role,
  ): Promise<void> {
    const clubRole = await this.prisma.clubRole.create({
      data: {
        userId,
        clubId,
        role,
      },
    });
  }

  async updateClub(
    clubId: string,
    updateClubDto: UpdateClubDTO
  ): Promise<void> {
    const existingClub = await this.prisma.club.findUnique({ where: { id: clubId }});
    if(!existingClub) {
      throw new HttpException('Club not found', 404);
    }
    this.prisma.club.update({
      where: { id: clubId },
      data: updateClubDto
    });
  }
}
