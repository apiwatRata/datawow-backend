import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConcertsModule } from './concerts.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      ConcertsModule,{
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'concerts',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'concerts-consumer'
          }
        },
    },);
  await app.listen();
}
bootstrap();
