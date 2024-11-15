import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true, 
  }));
  const logger = new Logger('Bootstrap');
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT ?? 3000);
  logger.log('Application is running on: http://localhost:3000');
}
bootstrap();
