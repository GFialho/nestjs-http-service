import { HttpException, Injectable } from '@nestjs/common';

import { LeaderboardService } from '../leaderboard/leaderboard.service';
// These functions can be used in the future
@Injectable()
export class MatchesService {
  constructor(private leaderboardService: LeaderboardService) {}

  async getTopUsers(matchId: number) {
    return this.leaderboardService.getLeaderboards({
      orderBy: { score: 'desc' },
      take: 50,
      where: { match_id: matchId },
    });
  }

  async getUser(matchId: number, userId: number) {
    const user = await this.leaderboardService.getLeaderboard({
      match_id_user_id_idx: {
        match_id: matchId,
        user_id: userId,
      },
    });

    if (!user) throw new HttpException('User not found', 404);

    const surroundingUsers = await this.leaderboardService.getLeaderboards({
      where: {
        match_id: matchId,
        position: {
          gte: user.position - 5,
          lte: user.position + 5,
        },
      },
      orderBy: {
        position: 'asc',
      },
    });

    return surroundingUsers;
  }
}
