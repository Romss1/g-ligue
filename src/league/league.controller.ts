import { Body, Controller, Param, Post } from '@nestjs/common';
import { LeagueService } from './league.service';
import { Auth } from 'src/auth/auth.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { CreateLeagueDTO } from './dto/create.league.dto';

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
}
