import { Module } from '@nestjs/common';
import { ConcertsService } from './concerts.service';
import { ConcertsController } from './concerts.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from 'apps/api-gateway/src/auth/auth.module';
@Module({
  imports:[
        ClientsModule.register([
          {
            name: 'CONCERTS_SERVICE',
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'concerts',
                brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
              },
              consumer: {
                groupId: 'concerts-consumer',
              }
            },
          },
        ]), AuthModule
    ],
  controllers: [ConcertsController],
  providers: [ConcertsService],
})
export class ConcertsModule {}
