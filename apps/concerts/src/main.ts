import { NestFactory } from '@nestjs/core';
import { ConcertsModule } from './concerts.module';

async function bootstrap() {
  const app = await NestFactory.create(ConcertsModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
