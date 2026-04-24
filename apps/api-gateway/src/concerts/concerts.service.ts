import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { KAFKA_TOPICS } from '../../../../libs/contracts/src/kafka.topics';
import { ConcertDto } from 'libs/contracts/src/concert/concert.dto';
import { GetConcertDto } from 'libs/contracts/src/concert/get-concert.dto';

@Injectable()
export class ConcertsService {
  constructor(@Inject('CONCERTS_SERVICE') private concertsClient: ClientKafka) {}

   async onModuleInit() {
      const topics = Object.values(KAFKA_TOPICS.CONCERTS);
      topics.forEach(t => this.concertsClient.subscribeToResponseOf(t));
      await this.concertsClient.connect();
    }

  createConcert(createConcertDto: CreateConcertDto) {
    return this.concertsClient.send(KAFKA_TOPICS.CONCERTS.CREATE, createConcertDto);
  }

  getAllConcerts(filter: GetConcertDto) {
    return this.concertsClient.send(KAFKA_TOPICS.CONCERTS.GET_ALL, {filter});
  }

  getConcertById(id: string) {
    return this.concertsClient.send(KAFKA_TOPICS.CONCERTS.GET_BY_ID, id);
  }

  updateConcert(id: string, concertDto: ConcertDto) {
    return this.concertsClient.send(KAFKA_TOPICS.CONCERTS.UPDATE, { id, concertDto });
  }

  deleteConcert(id: string) {
    return this.concertsClient.send(KAFKA_TOPICS.CONCERTS.DELETE, id);
  }
}
