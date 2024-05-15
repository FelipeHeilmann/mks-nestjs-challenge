import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalErrorMiddleware } from './api/middleware/GlobalErrorMiddleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalErrorMiddleware());
  await app.listen(3000);
}
bootstrap();
