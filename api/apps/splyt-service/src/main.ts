import { NestFactory } from '@nestjs/core';
import { SplytServiceModule } from './splyt-service.module';

async function bootstrap() {
  const app = await NestFactory.create(SplytServiceModule);
  await app.listen(3000);
}
bootstrap();
