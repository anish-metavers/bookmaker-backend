import { Test, TestingModule } from '@nestjs/testing';
import { HelperuserService } from './helperuser.service';

describe('HelperuserService', () => {
  let service: HelperuserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelperuserService],
    }).compile();

    service = module.get<HelperuserService>(HelperuserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
