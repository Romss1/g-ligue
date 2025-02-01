import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ClubModule } from './club/club.module';
import { JoinClubModule } from './join-club/join-club.module';

@Module({
  imports: [
    AuthModule,
    ClubModule,
    JoinClubModule,
    UserModule,
  ]
})
export class AppModule {}
