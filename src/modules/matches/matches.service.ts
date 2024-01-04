import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma, matches } from '@prisma/client';
import { LeaderboardService } from '../leaderboard/leaderboard.service';

@Injectable()
export class MatchesService {
  constructor(
    private prisma: PrismaService,
    private leaderboardService: LeaderboardService,
  ) {}

  async match(
    matchesWhereUniqueInput: Prisma.matchesWhereUniqueInput,
  ): Promise<matches | null> {
    return this.prisma.matches.findUnique({
      where: matchesWhereUniqueInput,
    });
  }

  async matches(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.matchesWhereUniqueInput;
    where?: Prisma.matchesWhereInput;
    orderBy?: Prisma.matchesOrderByWithRelationInput;
  }): Promise<matches[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.matches.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createMatches(data: Prisma.matchesCreateInput): Promise<matches> {
    return this.prisma.matches.create({
      data,
    });
  }

  async updateMatches(params: {
    where: Prisma.matchesWhereUniqueInput;
    data: Prisma.matchesUpdateInput;
  }): Promise<matches> {
    const { where, data } = params;
    return this.prisma.matches.update({
      data,
      where,
    });
  }

  async deleteMatches(where: Prisma.matchesWhereUniqueInput): Promise<matches> {
    return this.prisma.matches.delete({
      where,
    });
  }

  async getTopUsers(matchId: number) {
    return this.leaderboardService.leaderboards({
      orderBy: { score: 'desc' },
      take: 50,
      where: { match_id: matchId },
    });
  }

  async getUser(matchId: number, userId: number) {
    const user = await this.leaderboardService.leaderboard({
      match_id_user_id_idx: {
        match_id: matchId,
        user_id: userId,
      },
    });

    if (!user) throw new HttpException('User not found', 404);

    const surroundingUsers = await this.leaderboardService.leaderboards({
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
