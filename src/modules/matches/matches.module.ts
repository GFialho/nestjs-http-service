import { Module } from '@nestjs/common';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { LeaderboardModule } from '../leaderboard/leaderboard.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [LeaderboardModule, PrismaModule],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [MatchesService],
})
export class MatchesModule {}
