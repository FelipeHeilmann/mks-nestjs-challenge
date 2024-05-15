import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalErrorMiddleware } from './api/middleware/GlobalErrorMiddleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalErrorMiddleware());

  const config = new DocumentBuilder()
    .setTitle('Documentação da API')
    .setDescription(
      'Uma API com autenticação de usuários e cadastro de filmes de cinema ',
    )
    .setVersion('1.0')
    .addTag('users')
    .addTag('movies')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
