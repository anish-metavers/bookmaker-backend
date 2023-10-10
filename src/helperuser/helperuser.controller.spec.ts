import { Test, TestingModule } from '@nestjs/testing';
import { HelperuserController } from './helperuser.controller';
import { HelperuserService } from './helperuser.service';

describe('HelperuserController', () => {
  let controller: HelperuserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HelperuserController],
      providers: [HelperuserService],
    }).compile();

    controller = module.get<HelperuserController>(HelperuserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
