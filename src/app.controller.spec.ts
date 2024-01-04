import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getInfo', () => {
    it('should return information from AppService', () => {
      const result = {
        info: 'NestJs - Leaderboard API',
        version: 1,
      };

      jest
        .spyOn(appController['appService'], 'getInfo')
        .mockImplementation(() => result);

      expect(appController.getInfo()).toEqual(result);
    });
  });
});
