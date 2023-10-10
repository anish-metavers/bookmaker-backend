import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as Aerospike from 'aerospike';

@Injectable()
export class UserService {
  async createUser(createUserDto: CreateUserDto) {
    const writePolicy = new Aerospike.WritePolicy({
      // key: Aerospike.policy.key.SEND
    });

    let AerospikeClient = Aerospike.client({
      hosts: [{ addr: '127.0.0.1', port: 3000 }],
    });

    const client = await AerospikeClient.connect();

    const { name, userid, password, isAdmin } = createUserDto;

    let aeroKey = new Aerospike.Key('test', 'helperuser', `${userid}`);

    const exists = await client.exists(aeroKey);

    if (exists) return { success: true, message: 'User already exists' };

    await client.put(aeroKey, { name, userid, password, isAdmin }, writePolicy);

    client.close();

    return {
      success: true,
      message: 'User created successfully',
    };
  }
}
