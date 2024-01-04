import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Get information about the system',
  })
  @ApiResponse({ status: 200, description: 'System info' })
  @Get()
  getInfo() {
    return this.appService.getInfo();
  }
}
