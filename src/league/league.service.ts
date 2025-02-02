import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateLeagueDTO } from './dto/create.league.dto';

@Injectable()
export class LeagueService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async createLeague(clubId: string, createLeagueDto: CreateLeagueDTO): Promise<void> {
        await this.prisma.league.create({
            data: {
                ...createLeagueDto,
                clubId
            }
        });
    }
}
