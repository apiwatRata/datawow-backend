import { Controller, Get, Post, Patch, UseGuards, Param } from '@nestjs/common';
import { MessagePattern, Payload  } from '@nestjs/microservices';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from 'libs/contracts/src/reservation/create-reservation.dto';
import { GetReservationDto } from 'libs/contracts/src/reservation/get-reservation.dto';
import { Role } from "libs/common/src/enums/roles.enum"
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Roles([Role.USER, Role.ADMIN])
  @Post('reserve/:concert_id/user/:user_id')
  reserve(
    @Param('concert_id') concertId: string,
    @Param('user_id') userId: string,
  ) {
    return this.reservationsService.reserve({concert_id: concertId, user_id: userId});
  }

  @Roles([Role.USER, Role.ADMIN])
  @Post('cancel/:reservation_id')
  cancel( @Param('reservation_id') reservation_id: string) {
    return this.reservationsService.cancel(reservation_id);
  }

  @Roles([Role.USER, Role.ADMIN])
  @Get('personal/:user_id')
  getPersonalReservations(@Payload() user_id: string, getReservationDto: GetReservationDto ) {
    return this.reservationsService.getPersonalReservations(user_id, getReservationDto);
  }

  @Roles([Role.ADMIN])
  @Get()
  getAllReservations(@Payload() getReservationDto: GetReservationDto) {
    return this.reservationsService.getAllReservations(getReservationDto);
  }

}
