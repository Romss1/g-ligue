import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClubService } from './club.service';
import { CreateClubRequestDTO } from './dto/create.club.request.dto';
import { Auth } from 'src/auth/auth.decorator';
import { Role } from '@prisma/client';
import { ClubResponseDTO } from './dto/club.response.dto';

@Controller('clubs')
export class ClubController {
    constructor(private readonly clubService: ClubService){}

    @Auth(Role.USER)
    @Post()
    async create(@Body() createClubRequestDto: CreateClubRequestDTO) {
        this.clubService.createClub(createClubRequestDto);
    }

    @Auth(Role.USER)
    @Get()
    async getAllClubs(): Promise<ClubResponseDTO[]> {
        return this.clubService.getAllClubs();
    }

    @Auth(Role.USER)
    @Get(':uuid')
    async getClubByUuid(@Param('uuid') uuid: string): Promise<ClubResponseDTO> {
        return this.clubService.getClubByUuid(uuid);
    }
}
