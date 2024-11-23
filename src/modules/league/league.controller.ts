import { Body, Controller, Post } from '@nestjs/common';
import { CreateLeagueDto } from './dto/create-league.dto';
import { LeagueService } from './league.service';

@Controller('leagues')
export class LeagueController {
  constructor(private leagueService: LeagueService) {}
  
  @Post()
  async create(@Body() createLeagueDto: CreateLeagueDto) {
    return this.leagueService.createLeague(createLeagueDto);
  }
}
