import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ReservationsModule } from './reservations.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      ReservationsModule,{
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'reservations',
            brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
          },
          consumer: {
            groupId: 'reservations-consumer'
          }
        },
    },);
  await app.listen();
}
bootstrap();
