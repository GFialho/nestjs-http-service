import { Injectable } from '@nestjs/common';
import { Prisma, leaderboard } from '@prisma/client';
import { LeaderboardRepository } from './leaderboard.repository';

@Injectable()
export class LeaderboardService {
  constructor(private readonly leaderboardRepository: LeaderboardRepository) {}

  async getLeaderboard(
    input: Prisma.leaderboardWhereUniqueInput,
  ): Promise<leaderboard | null> {
    return this.leaderboardRepository.leaderboard(input);
  }

  async getLeaderboards(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.leaderboardWhereUniqueInput;
    where?: Prisma.leaderboardWhereInput;
    orderBy?: Prisma.leaderboardOrderByWithRelationInput;
  }): Promise<leaderboard[]> {
    return this.leaderboardRepository.leaderboards(params);
  }

  async createLeaderboard(
    data: Prisma.leaderboardCreateInput,
  ): Promise<leaderboard> {
    return this.leaderboardRepository.create(data);
  }

  async updateLeaderboard(params: {
    where: Prisma.leaderboardWhereUniqueInput;
    data: Prisma.leaderboardUpdateInput;
  }): Promise<leaderboard> {
    return this.leaderboardRepository.update(params);
  }

  async deleteLeaderboard(
    where: Prisma.leaderboardWhereUniqueInput,
  ): Promise<leaderboard> {
    return this.leaderboardRepository.remove(where);
  }
}
