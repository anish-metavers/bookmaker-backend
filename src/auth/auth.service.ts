import { HttpException, Injectable } from '@nestjs/common';
import { LoginDto, SignupDto } from './dto/create-auth.dto';
import * as Aerospike from 'aerospike';

@Injectable()
export class AuthService {
  async signUP(signupDTO: SignupDto) {
    const writePolicy = new Aerospike.WritePolicy({
      // key: Aerospike.policy.key.SEND
    });

    const AerospikeClient = Aerospike.client({
      hosts: [
        {
          addr: 'localhost',
          port: Number(3000),
        },
      ],
    });

    const client = await AerospikeClient.connect();

    const { name, userid, password } = signupDTO;

    let aeroKey = new Aerospike.Key('test', 'users', userid);

    const exists = await client.exists(aeroKey);

    if (exists) throw new HttpException({ message: 'User already exist' }, 400);

    // return { success: false, message: 'User already exists' };

    await client.put(aeroKey, { name, userid, password }, [], writePolicy);

    await client.close();

    return {
      success: true,
      message: 'Signup successful',
    };
  }

  async logIN(loginDTO: LoginDto) {
    const AerospikeClient = Aerospike.client({
      hosts: [
        {
          addr: 'localhost',
          port: Number(3000),
        },
      ],
    });
    const client = await AerospikeClient.connect();

    const { userid, password } = loginDTO;

    const aeroKey = new Aerospike.Key('test', 'users', userid);

    let exists = await client.exists(aeroKey);

    if (!exists) {
      throw new HttpException({ message: 'No User Found' }, 404);
      // return { success: false, message: 'No User Found' };
    }
    let record = await client.get(aeroKey);

    let pass_word = record.bins.password;

    if (pass_word != password) {
      throw new HttpException({ message: 'Invalid password' }, 404);
      // return { success: false, message: 'Invalid userid or password' };
    }
    await client.close();

    // return { success: exists, message: 'Login successful' };
    throw new HttpException({ message: 'Login successful' }, 200);
  }
}
