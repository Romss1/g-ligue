import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ClubModule } from './club/club.module';
import { MembershipRequestModule } from './membership-request/membership.request.module';
import { LeagueModule } from './league/league.module';

@Module({
  imports: [
    AuthModule,
    ClubModule,
    LeagueModule,
    MembershipRequestModule,
    UserModule,
  ]
})
export class AppModule {}
