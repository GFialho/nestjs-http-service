import { Module } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { PrismaModule } from '../prisma/prisma.module';
import { LeaderboardRepository } from './leaderboard.repository';

@Module({
  imports: [PrismaModule],
  providers: [LeaderboardService, LeaderboardRepository],
  exports: [LeaderboardService],
})
export class LeaderboardModule {}
