import { HttpException, Injectable } from '@nestjs/common';
import {
  CreateHelperuserDto,
  CreatePermissionDto,
  LoginHelperuserDto,
} from './dto/create-helperuser.dto';
import * as Aerospike from 'aerospike';
import * as jwt from 'jsonwebtoken';
import { UpdateHelperuserDto } from './dto/update-helperuser.dto';

@Injectable()
export class HelperuserService {
  async loginHelperUser(loginHelperUser: LoginHelperuserDto) {
    let AerospikeClient = Aerospike.client({
      hosts: [{ addr: '127.0.0.1', port: 3000 }],
    });

    const client = await AerospikeClient.connect();

    const { userid, password } = loginHelperUser;

    const token = jwt.sign(
      {
        userid: userid,
        password: password,
      },
      'secret',
      { expiresIn: '9h' },
    );

    const aeroKey = new Aerospike.Key('test', 'helperuser', userid);

    let exists = await client.exists(aeroKey);

    if (!exists) throw new HttpException({ message: 'No User Found' }, 404);

    let record = await client.get(aeroKey);

    let pass_word = record.bins.password;
    let accountLock = record.bins.accountLock;

    if (pass_word != password)
      throw new HttpException({ message: 'Invalid password' }, 404);

    if (accountLock == true)
      throw new HttpException({ message: 'Account Locked' }, 400);

    await client.close();

    throw new HttpException({ message: 'Login successful', token }, 200);
  }

  async createHelperUser(
    req: Request,
    createHelperuserDto: CreateHelperuserDto,
  ) {
    const reqUser = req['user'];

    if (!reqUser.isAdmin) {
      throw new HttpException({ message: 'User Not Admin!!' }, 400);
    }
    const writePolicy = new Aerospike.WritePolicy({
      // key: Aerospike.policy.key.SEND
    });

    let AerospikeClient = Aerospike.client({
      hosts: [{ addr: '127.0.0.1', port: 3000 }],
    });

    const client = await AerospikeClient.connect();

    const { name, userid, password, accountLock } = createHelperuserDto;

    let aeroKey = new Aerospike.Key('test', 'helperuser', `${userid}`);

    const exists = await client.exists(aeroKey);

    if (exists) return { success: true, message: 'User already exists' };

    await client.put(
      aeroKey,
      { name, userid, password, accountLock },
      writePolicy,
    );

    client.close();

    return {
      success: true,
      message: 'User created successfully',
    };
  }

  async createHelperUserPermission(createPermissionDto: CreatePermissionDto) {
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

    let checkUserid = new Aerospike.Key('test', 'helperuser', `${userid}`);
    const useridExists = await client.exists(checkUserid);

    let userIds = [userid];

    if (!useridExists)
      throw new HttpException({ message: 'Userid id does not exist!!' }, 400);

    if (exists) {
      let record = await client.get(aeroKey);

      if (record.bins.userIds && record.bins.userIds.includes(userid)) {
        throw new HttpException(
          { message: 'User already has this Permission!!' },
          400,
        );
      }
      userIds =
        record.bins.userIds && record.bins.userIds.length > 0
          ? record.bins.userIds
          : [];
      userIds.push(userid);
    }
    await client.put(aeroKey, { userIds, eventid }, writePolicy);

    client.close();

    return {
      success: true,
      message: 'User created successfully',
    };
  }

  async updatePasswordByUser(updateHelperuserDto: UpdateHelperuserDto) {
    let AerospikeClient = Aerospike.client({
      hosts: [{ addr: '127.0.0.1', port: 3000 }],
    });

    const client = await AerospikeClient.connect();

    const policy: any = Aerospike.policy;
    const updatePolicy = new Aerospike.WritePolicy({
      exists: policy.exists.UPDATE,
    });

    const { userid, password } = updateHelperuserDto;

    let aeroKey = new Aerospike.Key('test', 'helperuser', `${userid}`);

    const exists = await client.exists(aeroKey);

    if (!exists) return { success: false, message: 'User id does not exist' };

    await client.put(aeroKey, { password }, [], updatePolicy);

    await client.close();

    return { success: true, message: 'Passwords updated successfully' };
  }

  async updatePasswordByAdmin(updateHelperuserDto: UpdateHelperuserDto) {
    let AerospikeClient = Aerospike.client({
      hosts: [{ addr: '127.0.0.1', port: 3000 }],
    });

    const client = await AerospikeClient.connect();

    const policy: any = Aerospike.policy;
    const updatePolicy = new Aerospike.WritePolicy({
      exists: policy.exists.UPDATE,
    });

    const { userid, password, accountLock } = updateHelperuserDto;

    let aeroKey = new Aerospike.Key('test', 'helperuser', `${userid}`);

    const exists = await client.exists(aeroKey);

    if (!exists) return { success: false, message: 'User id does not exist' };

    const obj: any = {};
    if (password) obj.password = password;
    if (accountLock != null || accountLock != undefined)
      obj.accountLock = accountLock;

    if (Object.keys(obj).length > 0)
      await client.put(aeroKey, obj, [], updatePolicy);

    await client.close();

    return {
      success: true,
      message: 'Passwords Or accountLock updated successfully',
    };
  }

  // findAll() {
  //   return `This action returns all helperuser`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} helperuser`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} helperuser`;
  // }
}
