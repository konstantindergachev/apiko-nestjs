import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');

  const port = process.env.PORT;
  await app.listen(port);
  Logger.log(`Server starts on port: ${port}`);
}
bootstrap();
