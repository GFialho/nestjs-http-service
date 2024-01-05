import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, matches } from '@prisma/client';
// These functions can be used in the future
@Injectable()
export class MatchesService {
  constructor(private prisma: PrismaService) {}

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

  async create(data: Prisma.matchesCreateInput): Promise<matches> {
    return this.prisma.matches.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.matchesWhereUniqueInput;
    data: Prisma.matchesUpdateInput;
  }): Promise<matches> {
    const { where, data } = params;
    return this.prisma.matches.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.matchesWhereUniqueInput): Promise<matches> {
    return this.prisma.matches.delete({
      where,
    });
  }
}
