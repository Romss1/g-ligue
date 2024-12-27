import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ClubModule } from './club/club.module';

@Module({
  imports: [UserModule, AuthModule, ClubModule],
  controllers: [],

})
export class AppModule {}
