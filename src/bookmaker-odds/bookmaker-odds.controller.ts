import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'exception/httpExceptionFilter';
import { BookmakerOddsService } from './bookmaker-odds.service';
import { CreateBookmakerOddDto } from './dto/create-bookmaker-odd.dto';
import { UpdateBookmakerOddDto } from './dto/update-bookmaker-odd.dto';

@Controller('bookmaker')
@UseFilters(HttpExceptionFilter)
export class BookmakerOddsController {
  constructor(private readonly bookmakerOddsService: BookmakerOddsService) {}

  @Post()
  createBookmakerOdds(@Body() createBookmakerOddDto: CreateBookmakerOddDto) {
    return this.bookmakerOddsService.createBookmakerOdds(createBookmakerOddDto);
  }

  @Get(':eventId')
  findOne(@Param('eventId') eventId: string) {
    return this.bookmakerOddsService.findBookmakerOdds(+eventId);
  }

  @Put(':eventId')
  updateAllBookmakerOdds(
    @Param('eventId') eventId: string,
    @Body() updateBookmakerOddDto: UpdateBookmakerOddDto,
  ) {
    return this.bookmakerOddsService.updateAllBookmakerOdds(
      +eventId,
      updateBookmakerOddDto,
    );
  }

  @Delete(':eventId')
  deleteBookmakerOdds(@Param('eventId') eventId: string) {
    return this.bookmakerOddsService.deleteBookmakerOdds(+eventId);
  }
}
