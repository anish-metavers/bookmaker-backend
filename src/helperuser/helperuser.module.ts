import { Module } from '@nestjs/common';
import { HelperuserService } from './helperuser.service';
import { HelperuserController } from './helperuser.controller';

@Module({
  controllers: [HelperuserController],
  providers: [HelperuserService]
})
export class HelperuserModule {}
