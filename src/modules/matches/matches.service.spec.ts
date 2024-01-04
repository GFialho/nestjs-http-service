import { Test, TestingModule } from '@nestjs/testing';
import { MatchesService } from './matches.service';
import { LeaderboardService } from '../leaderboard/leaderboard.service';
import { PrismaService } from '../prisma/prisma.service';

describe('MatchesService', () => {
  let matchesService: MatchesService;
  let leaderboardService: LeaderboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchesService, LeaderboardService, PrismaService],
    }).compile();

    matchesService = module.get<MatchesService>(MatchesService);
    leaderboardService = module.get<LeaderboardService>(LeaderboardService);
  });

  describe('getTopUsers', () => {
    it('should return top 50 users in leaderboard', async () => {
      const mockTopUsers = [
        {
          id: 2582,
          match_id: 1,
          user_id: 7728810,
          user_name: 'user_553172',
          position: 582,
          score: 7793,
          updated_at: '2024-01-04T22:12:52.840Z',
          created_at: '2024-01-04T22:12:52.840Z',
        },
        {
          id: 1582,
          match_id: 1,
          user_id: 9764645,
          user_name: 'user_869138',
          position: 582,
          score: 81,
          updated_at: '2024-01-04T22:11:27.008Z',
          created_at: '2024-01-04T22:11:27.008Z',
        },
        {
          id: 582,
          match_id: 1,
          user_id: 4618027,
          user_name: 'user_174602',
          position: 582,
          score: 6349,
          updated_at: '2024-01-04T21:40:39.430Z',
          created_at: '2024-01-04T21:40:39.430Z',
        },
        {
          id: 3582,
          match_id: 1,
          user_id: 1560704,
          user_name: 'user_885096',
          position: 582,
          score: 2740,
          updated_at: '2024-01-04T22:15:25.530Z',
          created_at: '2024-01-04T22:15:25.530Z',
        },
      ];

      jest
        .spyOn(leaderboardService, 'leaderboards')
        .mockImplementation(async () => mockTopUsers as any);

      const result = await matchesService.getTopUsers(1);

      expect(result).toEqual(mockTopUsers);
    });
  });

  describe('getUser', () => {
    it('should return surrounding leaderboard users', async () => {
      const mockUser = {
        id: 2582,
        match_id: 1,
        user_id: 7728810,
        user_name: 'user_553172',
        position: 582,
        score: 7793,
        updated_at: '2024-01-04T22:12:52.840Z',
        created_at: '2024-01-04T22:12:52.840Z',
      };
      const mockSurroundingUsers = [
        {
          id: 2582,
          match_id: 1,
          user_id: 7728810,
          user_name: 'user_553172',
          position: 582,
          score: 7793,
          updated_at: '2024-01-04T22:12:52.840Z',
          created_at: '2024-01-04T22:12:52.840Z',
        },
        {
          id: 1582,
          match_id: 1,
          user_id: 9764645,
          user_name: 'user_869138',
          position: 582,
          score: 81,
          updated_at: '2024-01-04T22:11:27.008Z',
          created_at: '2024-01-04T22:11:27.008Z',
        },
        {
          id: 582,
          match_id: 1,
          user_id: 4618027,
          user_name: 'user_174602',
          position: 582,
          score: 6349,
          updated_at: '2024-01-04T21:40:39.430Z',
          created_at: '2024-01-04T21:40:39.430Z',
        },
        {
          id: 3582,
          match_id: 1,
          user_id: 1560704,
          user_name: 'user_885096',
          position: 582,
          score: 2740,
          updated_at: '2024-01-04T22:15:25.530Z',
          created_at: '2024-01-04T22:15:25.530Z',
        },
      ];

      jest
        .spyOn(leaderboardService, 'leaderboard')
        .mockImplementation(async () => mockUser as any);

      jest
        .spyOn(leaderboardService, 'leaderboards')
        .mockImplementation(async () => mockSurroundingUsers as any);

      const result = await matchesService.getUser(1, 2);

      expect(result).toEqual(mockSurroundingUsers);
    });

    it('should throw HttpException if user is not found', async () => {
      jest
        .spyOn(leaderboardService, 'leaderboard')
        .mockImplementation(async () => null);

      await expect(matchesService.getUser(1, 2)).rejects.toThrowError(
        'User not found',
      );
    });
  });
});
