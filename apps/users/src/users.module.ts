import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Reservation } from 'apps/reservations/src/entities/reservation.entity';
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
      models: [User, Reservation, Concert],
    }),
    SequelizeModule.forFeature([User, Reservation, Concert]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
