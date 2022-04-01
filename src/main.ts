import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('ToDo App')
  .setDescription('API do projeto ToDo')
  .setVersion('1.0')
  .addTag('ToDo')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('', app, document);

  await app.listen(3000);
}
bootstrap();
