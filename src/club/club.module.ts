import { Module } from '@nestjs/common';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ClubController],
  providers: [
    ClubService,
    PrismaService
  ]
})
export class ClubModule {}
