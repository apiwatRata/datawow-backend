import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports : [ClientsModule.register([
            {
              name: 'RESERVATIONS_SERVICE',
              transport: Transport.KAFKA,
              options: {
                client: {
                  clientId: 'reservations',
                  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
                },
                consumer: {
                  groupId: 'reservations-consumer',
                }
              },
            },
          ]), AuthModule],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
