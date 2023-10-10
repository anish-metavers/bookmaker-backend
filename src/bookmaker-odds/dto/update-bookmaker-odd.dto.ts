import { PartialType } from '@nestjs/mapped-types';
import { CreateBookmakerOddDto } from './create-bookmaker-odd.dto';

// export class Runner {
//   mid: string;
//   t: string;
//   sid: number;
//   nation: string;
//   b1: number;
//   bs1: number;
//   l1: number;
//   ls1: number;
//   gstatus: string;
//   matchName: string;
//   maxBetRate: number;
//   minBetRate: number;
//   betDelay: number;
//   maxBet: number;
//   minBet: number;
//   betlock: boolean;
//   display_message: string;
// }

// export class DataItem {
//   data: Runner;
//   difference: number;
//   odds: number;
// }

export class UpdateBookmakerOddDto extends PartialType(CreateBookmakerOddDto) {
  // dataToUpdate: DataItem[];
  teams: {
    map(arg0: (item: any) => any);
    name: string;
  };
  matchName: string;
  maxBetRate: number;
  minBetRate: number;
  betDelay: number;
  maxBet: number;
  minBet: number;
  betlock: boolean;
}
