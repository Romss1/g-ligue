import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { League } from './entities/league.entity';
import { LeagueService } from './league.service';
import { LeagueController } from './league.controller';

@Module({})
export class LeagueModule {}
