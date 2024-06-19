import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://studio.apollographql.com',
      'https://sandbox.embed.apollographql.com',
      // 'https://domain.site.com',
    ],
    methods: ['POST'],
  });
  await app.listen(3000);
}
bootstrap();
