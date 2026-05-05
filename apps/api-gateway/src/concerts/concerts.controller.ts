import { Controller, Post, UseGuards, Get, Delete, Patch, Query, Request, Param, Body } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConcertsService } from './concerts.service';
import { CreateConcertDto } from 'libs/contracts/src/concert/create-concert.dto';
import { ConcertDto } from 'libs/contracts/src/concert/concert.dto';
import { GetConcertDto } from 'libs/contracts/src/concert/get-concert.dto';
import { Role } from "libs/common/src/enums/roles.enum"
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('concerts')
export class ConcertsController {
  constructor(private readonly concertsService: ConcertsService) {}

  @Roles([Role.ADMIN])
  @Post('create')
  create(@Payload() createConcertDto: CreateConcertDto) {
    return this.concertsService.createConcert(createConcertDto);
  }

  @Roles([Role.USER, Role.ADMIN])
  @Get()
  findAll(@Query() query: GetConcertDto, @Request() req) {
    return this.concertsService.getAllConcerts(query, req.user.id);
  }

  @Roles([Role.ADMIN])
  @Get('seats')
  getSeats() {
    return this.concertsService.getSeats();
  }

  @Roles([Role.USER, Role.ADMIN])
  @Get(':id')
  findOne(@Payload() id: string) {
    return this.concertsService.getConcertById(id);
  }

  @Roles([Role.ADMIN])
  @Patch(':id')
  update(@Param('id') id: string , @Body() updateConcertDto: CreateConcertDto) {
    return this.concertsService.updateConcert(id, updateConcertDto);
  }

  @Roles([Role.ADMIN])
  @Delete(':id')
  remove(@Payload() id: string) {
    return this.concertsService.deleteConcert(id);
  }

  @Roles([Role.ADMIN])
  @Get('admin')
  adminGetConcerts(@Query() query: GetConcertDto){
    return this.concertsService.adminGetConcerts(query);
  }
}
