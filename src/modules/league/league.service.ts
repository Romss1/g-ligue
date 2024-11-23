import { Injectable } from '@nestjs/common';
import { CreateLeagueDto } from './dto/request/create-league.dto';
import { League } from './entities/league.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LeagueService {
  constructor(
    @InjectRepository(League)
    private readonly leagueRepository: Repository<League>,
  ) {}
  async createLeague(createLeagueDto: CreateLeagueDto): Promise<League> {
    const league = this.leagueRepository.create(createLeagueDto);

    return this.leagueRepository.save(league);
  }
}
