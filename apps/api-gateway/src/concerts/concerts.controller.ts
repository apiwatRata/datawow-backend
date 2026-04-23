import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConcertsService } from './concerts.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';

@Controller()
export class ConcertsController {
  constructor(private readonly concertsService: ConcertsService) {}

  @MessagePattern('createConcert')
  create(@Payload() createConcertDto: CreateConcertDto) {
    return this.concertsService.create(createConcertDto);
  }

  @MessagePattern('findAllConcerts')
  findAll() {
    return this.concertsService.findAll();
  }

  @MessagePattern('findOneConcert')
  findOne(@Payload() id: number) {
    return this.concertsService.findOne(id);
  }

  @MessagePattern('updateConcert')
  update(@Payload() updateConcertDto: UpdateConcertDto) {
    return this.concertsService.update(updateConcertDto.id, updateConcertDto);
  }

  @MessagePattern('removeConcert')
  remove(@Payload() id: number) {
    return this.concertsService.remove(id);
  }
}
