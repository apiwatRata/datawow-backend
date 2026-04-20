import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UsersModule } from './users.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,{
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'users',
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'users-consumer'
        }
      },
  },);
  await app.listen();
}
bootstrap();
