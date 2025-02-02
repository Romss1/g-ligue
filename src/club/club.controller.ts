import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ClubService } from './club.service';
import { CreateClubRequestDTO } from './dto/create.club.request.dto';
import { User } from '@prisma/client';
import { ClubResponseDTO } from './dto/club.response.dto';
import { UserDecorator } from 'src/user/user.decorator';
import { Auth } from 'src/auth/auth.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { UpdateClubDTO } from './dto/update.club.dto';

@Controller('clubs')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Auth(Role.USER)
  @Post()
  async create(
    @Body() createClubRequestDto: CreateClubRequestDTO,
    @UserDecorator() { id }: User,
  ): Promise<void> {
    const clubId: string =
      await this.clubService.createClub(createClubRequestDto);
    this.clubService.assignClubRole(id, clubId, Role.ADMIN);
  }

  @Auth(Role.MEMBER)
  @Get()
  async getAllClubs(): Promise<ClubResponseDTO[]> {
    return await this.clubService.getAllClubs();
  }

  @Auth(Role.MEMBER)
  @Get(':clubId')
  async getClubById(
    @Param('clubId') clubId: string,
  ): Promise<ClubResponseDTO> {
    return await this.clubService.getClubById(clubId);
  }

  @Auth(Role.ADMIN)
  @Patch(':clubId')
  async updateClub(
    @Param('clubId') clubId: string,
    @Body() updateClubDto: UpdateClubDTO
  ): Promise<void> {
    return await this.clubService.updateClub(clubId, updateClubDto);
  }
}
