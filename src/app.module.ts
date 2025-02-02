import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ClubModule } from './club/club.module';
import { MembershipRequestModule } from './membership-request/membership.request.module';

@Module({
  imports: [
    AuthModule,
    ClubModule,
    MembershipRequestModule,
    UserModule,
  ]
})
export class AppModule {}
