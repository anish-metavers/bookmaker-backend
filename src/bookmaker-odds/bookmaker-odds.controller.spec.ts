import { Test, TestingModule } from '@nestjs/testing';
import { BookmakerOddsController } from './bookmaker-odds.controller';
import { BookmakerOddsService } from './bookmaker-odds.service';

describe('BookmakerOddsController', () => {
  let controller: BookmakerOddsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookmakerOddsController],
      providers: [BookmakerOddsService],
    }).compile();

    controller = module.get<BookmakerOddsController>(BookmakerOddsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
