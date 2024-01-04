import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('getInfo', () => {
    it('should return information', () => {
      const result = {
        info: 'NestJs - Leaderboard API',
        version: 1,
      };

      expect(appService.getInfo()).toEqual(result);
    });
  });
});
