import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClubService } from './club.service';
import { CreateClubRequestDTO } from './dto/create.club.request.dto';
import { Auth } from 'src/auth/auth.decorator';
import { ClubRoleType, Role, User} from '@prisma/client';
import { ClubResponseDTO } from './dto/club.response.dto';
import { UserDecorator } from 'src/user/user.decorator';

@Controller('clubs')
export class ClubController {
    constructor(private readonly clubService: ClubService){}

    @Auth(Role.USER)
    @Post()
    async create(
        @Body() createClubRequestDto: CreateClubRequestDTO,
        @UserDecorator() { id }: User,
    ) {
        const clubId: string = await this.clubService.createClub(createClubRequestDto);
        this.clubService.assignClubRole(id, clubId, ClubRoleType.ADMIN)
    }

    @Auth(Role.USER)
    @Get()
    async getAllClubs(): Promise<ClubResponseDTO[]> {
        return await this.clubService.getAllClubs();
    }

    @Auth(Role.USER)
    @Get(':uuid')
    async getClubByUuid(@Param('uuid') uuid: string): Promise<ClubResponseDTO> {
        return await this.clubService.getClubByUuid(uuid);
    }
}
