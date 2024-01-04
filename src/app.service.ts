import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() {
    return {
      info: 'NestJs - Leaderboard API',
      version: 1,
    };
  }
}
