import { Controller, Get } from '@nestjs/common';
import { ConcertsService } from './concerts.service';
import { MessagePattern } from '@nestjs/microservices/decorators/message-pattern.decorator';
import { GetConcertDto } from 'libs/contracts/src/concert/get-concert.dto';
import { ResponseDto } from 'libs/contracts/src/response.dto';
import { ConcertDto } from 'libs/contracts/src/concert/concert.dto';
import { CreateConcertDto } from 'libs/contracts/src/concert/create-concert.dto';
import { KAFKA_TOPICS } from 'libs/contracts/src/kafka.topics';
@Controller()
export class ConcertsController {
  constructor(private readonly concertsService: ConcertsService) {}

  @MessagePattern(KAFKA_TOPICS.CONCERTS.GET_ALL)
  getAllConcerts(filter: GetConcertDto): Promise<ResponseDto> {
    return this.concertsService.getAllConcerts(filter);
  }

  @MessagePattern(KAFKA_TOPICS.CONCERTS.GET_BY_ID)
  getConcertById(id: string): Promise<ResponseDto> {
    return this.concertsService.getConcertById(id);
  }

  @MessagePattern(KAFKA_TOPICS.CONCERTS.CREATE)
  createConcert(createConcertDto: CreateConcertDto): Promise<ResponseDto> {
    return this.concertsService.createConcert(createConcertDto);
  }

  @MessagePattern(KAFKA_TOPICS.CONCERTS.DELETE)
  deleteConcert(id: string): Promise<ResponseDto> {
    return this.concertsService.deleteConcert(id);
  }

  @MessagePattern(KAFKA_TOPICS.CONCERTS.UPDATE)
  updateConcert(data: { id: string, concertDto: ConcertDto }): Promise<ResponseDto> {
    return this.concertsService.updateConcert(data.id, data.concertDto);
  } 
}
