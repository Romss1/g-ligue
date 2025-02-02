import { Module } from '@nestjs/common';
import { MembershipRequestController } from './membership.request.controller';
import { MembershipRequestService } from './membership.request.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MembershipRequestController],
    providers: [
        MembershipRequestService,
        PrismaService
    ]
})
export class MembershipRequestModule {}
