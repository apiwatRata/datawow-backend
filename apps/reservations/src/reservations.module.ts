import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reservation } from './entities/reservation.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'admin',
        password: 'p@ssw0rd',
        database: 'datawow',
        logging: false,
        models: [Reservation],
      }),
      SequelizeModule.forFeature([Reservation]),
    ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
