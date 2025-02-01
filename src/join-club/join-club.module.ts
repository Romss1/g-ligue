import { Module } from '@nestjs/common';
import { JoinClubController } from './join-club.controller';
import { JoinClubService } from './join-club.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers: [JoinClubController],
    providers: [
        JoinClubService,
        PrismaService
    ]
})
export class JoinClubModule {}
