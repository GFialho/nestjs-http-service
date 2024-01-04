import { Test, TestingModule } from '@nestjs/testing';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

jest.mock('./matches.service'); // Mock MatchesService

describe('MatchesController', () => {
  let matchesController: MatchesController;
  let matchesService: MatchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchesController],
      providers: [MatchesService],
    })
      .overrideInterceptor(CacheInterceptor)
      .useValue({}) // Disable CacheInterceptor for testing purposes
      .compile();

    matchesController = module.get<MatchesController>(MatchesController);
    matchesService = module.get<MatchesService>(MatchesService);
  });

  describe('getTopUsersLeaderboard', () => {
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
        .spyOn(matchesService, 'getTopUsers')
        .mockResolvedValueOnce(mockTopUsers as any);

      const result = await matchesController.getTopUsersLeaderboard('1');

      expect(result).toEqual(mockTopUsers);
    });
  });

  describe('getUserLeaderboard', () => {
    it('should return surrounding leaderboard users', async () => {
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
        .spyOn(matchesService, 'getUser')
        .mockResolvedValueOnce(mockSurroundingUsers as any);

      const result = await matchesController.getUserLeaderboard('1', '2');

      expect(result).toEqual(mockSurroundingUsers);
    });
  });
});
