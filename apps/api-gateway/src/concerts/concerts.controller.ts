import { Controller, Post, UseGuards, Get, Delete, Patch, Query } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConcertsService } from './concerts.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { ConcertDto } from 'libs/contracts/src/concert/concert.dto';
import { GetConcertDto } from 'libs/contracts/src/concert/get-concert.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../auth/auth-role.guard';
@Controller('concerts')
export class ConcertsController {
  constructor(private readonly concertsService: ConcertsService) {}


  @Post('create')
  @UseGuards(AuthGuard, AdminGuard)
  create(@Payload() createConcertDto: CreateConcertDto) {
    return this.concertsService.createConcert(createConcertDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Query() query: GetConcertDto) {
    return this.concertsService.getAllConcerts(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Payload() id: string) {
    return this.concertsService.getConcertById(id);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Patch(':id')
  update(@Payload() id: string , updateConcertDto: ConcertDto) {
    return this.concertsService.updateConcert(id, updateConcertDto);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Payload() id: string) {
    return this.concertsService.deleteConcert(id);
  }
}
