import { Controller, Get } from '@nestjs/common';
import { ConcertsService } from './concerts.service';

@Controller()
export class ConcertsController {
  constructor(private readonly concertsService: ConcertsService) {}

  @Get()
  getHello(): string {
    return this.concertsService.getHello();
  }
}
