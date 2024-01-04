import {
  Controller,
  Get,
  HttpCode,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MatchesService } from './matches.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { GetTopLeaderboardResponse } from './interfaces';

@ApiTags('matches')
@Controller({ path: 'matches' })
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}
  @UseInterceptors(CacheInterceptor) // Automatically cache the response for this endpoint
  @Get(':match_id/leaderboard/top')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get top 50 users in leaderboard' })
  @ApiResponse({
    status: 200,
    description: 'Top leaderboard users',
    type: GetTopLeaderboardResponse,
  })
  getTopUsersLeaderboard(
    @Param('match_id') match_id: string,
  ): Promise<GetTopLeaderboardResponse[]> {
    return this.matchesService.getTopUsers(+match_id);
  }

  @UseInterceptors(CacheInterceptor) // Automatically cache the response for this endpoint
  @Get(':match_id/leaderboard/:user_id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get position and score of given user and surrounding users',
  })
  @ApiResponse({
    status: 200,
    description: 'Surrounding leaderboard users',
  })
  getUserLeaderboard(
    @Param('match_id') match_id: string,
    @Param('user_id') user_id: string,
  ) {
    return this.matchesService.getUser(+match_id, +user_id);
  }
}
