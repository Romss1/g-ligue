import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateLeagueDTO } from './dto/create.league.dto';
import { LeagueResponseDTO } from './dto/league.response.dto';

@Injectable()
export class LeagueService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async createLeague(clubId: string, createLeagueDto: CreateLeagueDTO): Promise<void> {
        await this.prisma.league.create({
            data: {
                ...createLeagueDto,
                clubId
            }
        });
    }

    async getAllClubLeagues(clubId: string): Promise<LeagueResponseDTO[]> {
        const leagues = await this.prisma.league.findMany({
            where: { clubId: clubId }
        });

        return leagues.map(
            (league) => new LeagueResponseDTO(
                league.id,
                league.name,
                league.description,
                league.isAuthorizedMidSeasonRegistration,
                league.numberOfPlayerByDivision,
                league.startDate,
                league.endDate
            )
        );
    }
}
