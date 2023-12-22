import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { credentials } from './utils/constants/credentials';
import { messages } from './utils/constants/messages';

const ABOUT = messages.ABOUT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle(ABOUT.API_TITLE)
    .setDescription(ABOUT.API_DESCRIPTION)
    .setVersion(ABOUT.SWAGGER_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(ABOUT.SWAGGER_ROUTE, app, document);
  await app.listen(credentials.PORT);
}
bootstrap();
