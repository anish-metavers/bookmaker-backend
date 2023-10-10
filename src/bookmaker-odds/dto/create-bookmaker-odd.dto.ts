export class CreateBookmakerOddDto {
  teams: {
    map(arg0: (item: any) => any);
    name: string;
  };
  eventId: number;
  matchName: string;
  maxBetRate: number;
  minBetRate: number;
  betDelay: number;
  maxBet: number;
  minBet: number;
  betlock: boolean;
}
