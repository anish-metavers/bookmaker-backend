import { Test, TestingModule } from '@nestjs/testing';
import { BookmakerOddsService } from './bookmaker-odds.service';

describe('BookmakerOddsService', () => {
  let service: BookmakerOddsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookmakerOddsService],
    }).compile();

    service = module.get<BookmakerOddsService>(BookmakerOddsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
