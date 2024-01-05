import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { LeaderboardService } from '../leaderboard/leaderboard.service';

describe('MatchesService', () => {
  let matchesService: MatchesService;
  let leaderboardServiceMock: Partial<LeaderboardService>;

  beforeEach(async () => {
    leaderboardServiceMock = {
      getLeaderboards: jest.fn(),
      getLeaderboard: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchesService,
        { provide: LeaderboardService, useValue: leaderboardServiceMock },
      ],
    }).compile();

    matchesService = module.get<MatchesService>(MatchesService);
  });

  describe('getTopUsers', () => {
    it('should call getLeaderboards with correct parameters', async () => {
      const matchId = 123;
      await matchesService.getTopUsers(matchId);
      expect(leaderboardServiceMock.getLeaderboards).toHaveBeenCalledWith({
        orderBy: { score: 'desc' },
        take: 50,
        where: { match_id: matchId },
      });
    });
  });

  describe('getUser', () => {
    it('should throw HttpException if user is not found', async () => {
      const matchId = 456;
      const userId = 789;

      (leaderboardServiceMock.getLeaderboard as any).mockResolvedValue(null);

      await expect(matchesService.getUser(matchId, userId)).rejects.toThrow(
        new HttpException('User not found', 404),
      );
    });

    it('should call getLeaderboard and getLeaderboards with correct parameters', async () => {
      const matchId = 456;
      const userId = 789;

      const userMock = { position: 10 };

      (leaderboardServiceMock.getLeaderboard as any).mockResolvedValue(userMock);
      (leaderboardServiceMock.getLeaderboards as any).mockResolvedValue([]);

      await matchesService.getUser(matchId, userId);

      expect(leaderboardServiceMock.getLeaderboard).toHaveBeenCalledWith({
        match_id_user_id_idx: {
          match_id: matchId,
          user_id: userId,
        },
      });

      expect(leaderboardServiceMock.getLeaderboards).toHaveBeenCalledWith({
        where: {
          match_id: matchId,
          position: {
            gte: userMock.position - 5,
            lte: userMock.position + 5,
          },
        },
        orderBy: {
          position: 'asc',
        },
      });
    });
  });
});
