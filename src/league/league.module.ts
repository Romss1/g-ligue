import { Module } from '@nestjs/common';
import { LeagueController } from './league.controller';
import { LeagueService } from './league.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LeagueController],
  providers: [
    LeagueService,
    PrismaService
  ]
})
export class LeagueModule {}
