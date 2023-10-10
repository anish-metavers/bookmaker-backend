import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import * as Aerospike from 'aerospike';

@Injectable()
export class PermissionService {
  async create(createPermissionDto: CreatePermissionDto) {
    const writePolicy = new Aerospike.WritePolicy({
      // key: Aerospike.policy.key.SEND
    });

    let AerospikeClient = Aerospike.client({
      hosts: [{ addr: '127.0.0.1', port: 3000 }],
    });

    const client = await AerospikeClient.connect();

    const { userid, eventid } = createPermissionDto;

    let aeroKey = new Aerospike.Key('test', 'permission', `${eventid}`);

    const exists = await client.exists(aeroKey);

    if (exists) return { success: true, message: 'Permission already exists' };

    await client.put(aeroKey, { userid, eventid }, writePolicy);

    client.close();

    return {
      success: true,
      message: 'Permission created successfully',
    };
  }

  findAll() {
    return `This action returns all permission`;
  }

  async findOne(eventid: number) {
    const config = { hosts: '127.0.0.1:3000' };

    const client = await Aerospike.connect(config);

    const aeroKey = new Aerospike.Key('test', 'permission', `${eventid}`);

    const readPolicy = new Aerospike.ReadPolicy({
      socketTimeout: 300,
    });

    const exists = await client.exists(aeroKey);

    if (!exists) return { success: false, message: 'Event id does not exist' };

    const record = await client.get(aeroKey, readPolicy);

    const result = record.bins;

    await client.close();

    return result;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
