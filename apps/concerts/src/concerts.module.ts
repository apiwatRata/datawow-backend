import { Module } from '@nestjs/common';
import { ConcertsController } from './concerts.controller';
import { ConcertsService } from './concerts.service';

@Module({
  imports: [],
  controllers: [ConcertsController],
  providers: [ConcertsService],
})
export class ConcertsModule {}
