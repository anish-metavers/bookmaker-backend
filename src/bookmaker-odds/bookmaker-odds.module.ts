import { Module } from '@nestjs/common';
import { BookmakerOddsService } from './bookmaker-odds.service';
import { BookmakerOddsController } from './bookmaker-odds.controller';

@Module({
  controllers: [BookmakerOddsController],
  providers: [BookmakerOddsService]
})
export class BookmakerOddsModule {}
