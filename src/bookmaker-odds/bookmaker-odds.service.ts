import { HttpException, Injectable } from '@nestjs/common';
import { CreateBookmakerOddDto } from './dto/create-bookmaker-odd.dto';
import { UpdateBookmakerOddDto } from './dto/update-bookmaker-odd.dto';
import * as Aerospike from 'aerospike';
const generateUniqueId = require('generate-unique-id');

@Injectable()
export class BookmakerOddsService {
  async createBookmakerOdds(createBookmakerOddDto: CreateBookmakerOddDto) {
    const writePolicy = new Aerospike.WritePolicy({
      // key: Aerospike.policy.key.SEND
    });

    const timeToLeave = { ttl: 1000000 };

    let AerospikeClient = Aerospike.client({
      hosts: [{ addr: '127.0.0.1', port: 3000 }],
    });

    const client = await AerospikeClient.connect();

    const mid = generateUniqueId({
      length: 10,
      useLetters: false,
    });

    const marketId = '4.' + mid + '-BM';

    const {
      matchName,
      maxBetRate,
      minBetRate,
      betDelay,
      maxBet,
      minBet,
      betlock,
      teams,
      eventId,
    } = createBookmakerOddDto;

    let aeroKey = new Aerospike.Key('test', 'bookmaker', `${eventId}`);

    const exists = await client.exists(aeroKey);

    // if (exists) return { success: true, message: 'Bookmaker odds already exists' };
    if (exists)
      throw new HttpException(
        { message: 'Bookmaker odds already exists' },
        400,
      );

    const List = {
      t: 'Bookmaker 0%Comm',
      b1: '0',
      bs1: '',
      l1: '0',
      ls1: '',
      gstatus: 'OPEN',
      mid: marketId,
    };

    const arrayList = teams.map((item) => {
      return {
        ...List,
        ...item,
        sid: generateUniqueId({
          length: 5,
          useLetters: false,
        }),
        matchName,
        maxBetRate,
        minBetRate,
        betDelay,
        maxBet,
        minBet,
        betlock,
      };
    });

    await client.put(aeroKey, { arrayList }, timeToLeave, writePolicy);

    client.close();

    return {
      success: true,
      message: 'Bookmaker Odds created successfully',
    };
  }

  async findBookmakerOdds(eventId: number) {
    const config = { hosts: '127.0.0.1:3000' };

    const client = await Aerospike.connect(config);

    const aeroKey = new Aerospike.Key('test', 'bookmaker', `${eventId}`);

    const readPolicy = new Aerospike.ReadPolicy({
      socketTimeout: 300,
    });

    const exists = await client.exists(aeroKey);

    // if (!exists) return { success: false, message: 'Event id does not exist' };

    if (!exists)
      throw new HttpException({ message: 'Event id does not exist' }, 400);

    const record = await client.get(aeroKey, readPolicy);

    const result = record.bins.arrayList;

    await client.close();

    return result;
  }

  async updateAllBookmakerOdds(
    eventId: number,
    updateBookmakerOddDto: UpdateBookmakerOddDto,
  ) {
    const config = { hosts: '127.0.0.1:3000' };
    const client = await Aerospike.connect(config);

    const policy: any = Aerospike.policy;
    const updatePolicy = new Aerospike.WritePolicy({
      exists: policy.exists.UPDATE,
    });

    const mid = generateUniqueId({
      length: 10,
      useLetters: false,
    });
    const marketId = '4.' + mid + '-BM';

    const {
      matchName,
      maxBetRate,
      minBetRate,
      betDelay,
      maxBet,
      minBet,
      betlock,
      teams,
    } = updateBookmakerOddDto;

    const List = {
      t: 'Bookmaker 0%Comm',
      b1: '0',
      bs1: '',
      l1: '0',
      ls1: '',
      gstatus: 'OPEN',
      mid: marketId,
    };

    const arrayList = teams.map((item) => {
      return {
        ...List,
        ...item,
        sid: generateUniqueId({
          length: 5,
          useLetters: false,
        }),
        matchName,
        maxBetRate,
        minBetRate,
        betDelay,
        maxBet,
        minBet,
        betlock,
      };
    });

    const aeroKey = new Aerospike.Key('test', 'bookmaker', `${eventId}`);

    const exists = await client.exists(aeroKey);

    if (!exists) return { success: false, message: 'Event id does not exist' };

    await client.put(aeroKey, { arrayList }, [], updatePolicy);

    await client.close();
    return {
      success: true,
      message: 'Bookmaker Odd updated successfully',
    };
  }

  async deleteBookmakerOdds(eventId: number) {
    const config = { hosts: '127.0.0.1:3000' };
    const client = await Aerospike.connect(config);

    let deletePolicy = new Aerospike.WritePolicy({
      durableDelete: true,
    });

    const key = new Aerospike.Key('test', 'bookmaker', `${eventId}`);

    const exists = await client.exists(key);

    if (!exists) return { success: false, message: 'Event id does not exist' };

    await client.remove(key, deletePolicy);

    await client.close();
    return {
      success: true,
      message: 'Bookmaker Odd deleted successfully',
    };
  }
}
