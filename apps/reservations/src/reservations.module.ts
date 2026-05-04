import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reservation } from './entities/reservation.entity';
import { User } from 'apps/users/src/entities/user.entity';
import { Concert } from 'apps/concerts/src/entities/concert.entity';

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
        models: [Reservation, User, Concert],
      }),
      SequelizeModule.forFeature([Reservation, User, Concert]),
    ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
