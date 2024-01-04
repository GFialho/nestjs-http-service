import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, leaderboard } from '@prisma/client';

@Injectable()
export class LeaderboardService {
  constructor(private prisma: PrismaService) {}

  async leaderboard(
    leaderboardWhereUniqueInput: Prisma.leaderboardWhereUniqueInput,
  ): Promise<leaderboard | null> {
    return this.prisma.leaderboard.findUnique({
      where: leaderboardWhereUniqueInput,
    });
  }

  async leaderboards(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.leaderboardWhereUniqueInput;
    where?: Prisma.leaderboardWhereInput;
    orderBy?: Prisma.leaderboardOrderByWithRelationInput;
  }): Promise<leaderboard[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.leaderboard.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createLeaderboard(
    data: Prisma.leaderboardCreateInput,
  ): Promise<leaderboard> {
    return this.prisma.leaderboard.create({
      data,
    });
  }

  async updateLeaderboard(params: {
    where: Prisma.leaderboardWhereUniqueInput;
    data: Prisma.leaderboardUpdateInput;
  }): Promise<leaderboard> {
    const { where, data } = params;
    return this.prisma.leaderboard.update({
      data,
      where,
    });
  }

  async deleteLeaderboard(
    where: Prisma.leaderboardWhereUniqueInput,
  ): Promise<leaderboard> {
    return this.prisma.leaderboard.delete({
      where,
    });
  }
}
