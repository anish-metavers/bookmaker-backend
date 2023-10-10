import * as Aerospike from 'aerospike';
const client = Aerospike.client({
  hosts: [
    {
      addr: 'localhost',
      port: 3000,
    },
  ],
});
async function AerospikeConnect() {
  try {
    const status = await client.connect();
    global.ASClient = status;
    console.log('!------ Aerospike database connected successfully ------! ');
  } catch (error) {
    console.log('!------ Aerospike database not connected ------!');
  }
}
export default AerospikeConnect;
