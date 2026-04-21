import { Injectable } from '@nestjs/common';

@Injectable()
export class ConcertsService {
  getHello(): string {
    return 'Hello World!';
  }
}
