import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { CreateLeagueDto } from './dto/request/create-league.dto';
import { LeagueService } from './league.service';
import { Response } from 'express';

@Controller('leagues')
export class LeagueController {
  constructor(private leagueService: LeagueService) {}

  @Post()
  @HttpCode(204)
  async create(@Body() createLeagueDto: CreateLeagueDto, @Res() res: Response) {
    this.leagueService.createLeague(createLeagueDto);
    
     return res.send({message: 'League created'})
  }
}
