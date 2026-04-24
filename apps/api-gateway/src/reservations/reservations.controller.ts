import { Controller, Get, Post, Patch, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload  } from '@nestjs/microservices';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from 'libs/contracts/src/reservation/create-reservation.dto';
import { GetReservationDto } from 'libs/contracts/src/reservation/get-reservation.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../auth/auth-role.guard';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post('reserve/:concert_id/user/:user_id')
  @UseGuards(AuthGuard)
  reserve(@Payload() createReservationDto: CreateReservationDto) {
    return this.reservationsService.reserve(createReservationDto);
  }

  @Post('cancel/:reservation_id')
  @UseGuards(AuthGuard)
  cancel(@Payload() reservation_id: string) {
    return this.reservationsService.cancel(reservation_id);
  }

  @Get('personal/:user_id')
  @UseGuards(AuthGuard)
  getPersonalReservations(@Payload() user_id: string, getReservationDto: GetReservationDto ) {
    return this.reservationsService.getPersonalReservations(user_id, getReservationDto);
  }

  @Get()
  @UseGuards(AuthGuard, AdminGuard)
  getAllReservations(@Payload() getReservationDto: GetReservationDto) {
    return this.reservationsService.getAllReservations(getReservationDto);
  }

}
