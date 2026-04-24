import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { GetReservationDto } from 'libs/contracts/src/reservation/get-reservation.dto';
import { KAFKA_TOPICS } from '../../../../libs/contracts/src/kafka.topics';
import { CreateReservationDto } from 'libs/contracts/src/reservation/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(@Inject('RESERVATIONS_SERVICE') private reservationsClient: ClientKafka) {}

  async onModuleInit() {
    const topics = Object.values(KAFKA_TOPICS.RESERVATIONS);
    topics.forEach(t => this.reservationsClient.subscribeToResponseOf(t));
    await this.reservationsClient.connect();
  }

  reserve(createReservationDto: CreateReservationDto) {
    return this.reservationsClient.send(KAFKA_TOPICS.RESERVATIONS.RESERVE, createReservationDto);
  }

  cancel(reservation_id: string) {
    return this.reservationsClient.send(KAFKA_TOPICS.RESERVATIONS.CANCEL, { reservation_id });
  }

  getPersonalReservations(user_id: string, getReservationDto: GetReservationDto ) {
    return this.reservationsClient.send(KAFKA_TOPICS.RESERVATIONS.GET_PERSONAL, { user_id, getReservationDto });
  }

  getAllReservations(getReservationDto: GetReservationDto) {
    return this.reservationsClient.send(KAFKA_TOPICS.RESERVATIONS.GET_ALL, getReservationDto);
  }

}
