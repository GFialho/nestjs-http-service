import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ExceptionFormatter,
  ResponseFormatter,
} from './common/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

const getServer = () => {
  switch (process.env.NODE_ENV) {
    case 'local':
      return 'http://localhost.com:3000';
    // We can insert more stages here
    default:
      return 'http://localhost.com:3000';
  }
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS
  app.enableCors();

  // Enable custom logic on shutdown
  app.enableShutdownHooks();

  // Intercept responses to standardize the format
  app.useGlobalInterceptors(new ResponseFormatter());
  app.useGlobalFilters(new ExceptionFormatter());

  // Enable Swagger
  const config = new DocumentBuilder()
    .setTitle('Hunters on Chain API')
    .setDescription('API for Hunters on Chain game')
    .setVersion('1.0')
    .addServer(getServer())
    .addBearerAuth(
      {
        name: 'authorization',
        type: 'apiKey',
        in: 'header',
      },
      'access-token',
    )
    .addTag('Hunters on Chain')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('docs', app, document);

  // Start the server
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
