import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { AuthController } from './modules/auth/auth.controller';
import { User } from './modules/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { League } from './modules/league/entities/league.entity';
import { Club } from './modules/club/entities/club.entity';
import { Division } from './modules/division/entities/division.entity';
import { Round } from './modules/round/entities/round.entity';
import { Match } from './modules/match/entities/match.entity';
import { Player } from './modules/user/entities/player.entity';
import { LeagueModule } from './modules/league/league.module';
import { LeagueController } from './modules/league/league.controller';
import { LeagueService } from './modules/league/league.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USERNAME'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        entities: [User, Club, League, Division, Round, Match, Player],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, League]),
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    LeagueModule,
  ],
  controllers: [AppController, AuthController, LeagueController],
  providers: [AppService, AuthService, LeagueService],
})
export class AppModule {}
