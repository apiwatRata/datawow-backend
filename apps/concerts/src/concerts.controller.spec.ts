import { Test, TestingModule } from '@nestjs/testing';
import { ConcertsController } from './concerts.controller';
import { ConcertsService } from './concerts.service';

describe('ConcertsController', () => {
  let concertsController: ConcertsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ConcertsController],
      providers: [ConcertsService],
    }).compile();

    concertsController = app.get<ConcertsController>(ConcertsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(concertsController.getHello()).toBe('Hello World!');
    });
  });
});
