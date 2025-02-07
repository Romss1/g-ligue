import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LeagueService } from './league.service';
import { Auth } from 'src/auth/auth.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { CreateLeagueDTO } from './dto/create.league.dto';
import { LeagueResponseDTO } from './dto/league.response.dto';

@Controller('clubs/:clubId/leagues')
export class LeagueController {
    constructor(
        private readonly leagueService: LeagueService,
    ) {}

    @Auth(Role.ADMIN)
    @Post()
    async createLeague(
        @Param('clubId') clubId: string,
        @Body() createLeagueDto: CreateLeagueDTO
    ) {
        await this.leagueService.createLeague(clubId, createLeagueDto);
    }

    @Auth(Role.MEMBER)
    @Get()
    async getAllClubLeagues(@Param('clubId') clubId: string): Promise<LeagueResponseDTO[]> {
        return await this.leagueService.getAllClubLeagues(clubId);
    }
}
