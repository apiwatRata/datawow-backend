import { Controller, Get } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { MessagePattern } from '@nestjs/microservices/decorators/message-pattern.decorator';
import { KAFKA_TOPICS } from 'libs/contracts/src/kafka.topics';
import { GetReservationDto } from 'libs/contracts/src/reservation/get-reservation.dto';
import { CreateReservationDto } from 'libs/contracts/src/reservation/create-reservation.dto';
import { ResponseDto } from 'libs/contracts/src/response.dto';

@Controller()
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @MessagePattern(KAFKA_TOPICS.RESERVATIONS.RESERVE)
  reserve(createReservationDto: CreateReservationDto): Promise<ResponseDto> {
    return this.reservationsService.reserve(createReservationDto);
  }

  @MessagePattern(KAFKA_TOPICS.RESERVATIONS.CANCEL)
  cancel(reservation_id: string): Promise<ResponseDto> {
    return this.reservationsService.cancel(reservation_id);
  }

  @MessagePattern(KAFKA_TOPICS.RESERVATIONS.GET_PERSONAL)
  getPersonalReservations(data: { user_id: string, getReservationDto: GetReservationDto }): Promise<ResponseDto> {
    return this.reservationsService.getPersonalReservations(data.user_id, data.getReservationDto);
  }

  @MessagePattern(KAFKA_TOPICS.RESERVATIONS.GET_ALL)
  getAllReservations(getReservationDto: GetReservationDto): Promise<ResponseDto> {
    return this.reservationsService.getAllReservations(getReservationDto);
  }
}
