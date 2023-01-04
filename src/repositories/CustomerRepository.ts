import Customer from "../model/Customer";
import { Client } from 'cassandra-driver';

class CustomerRepository {

  client: Client;

  constructor(){
    this.client = new Client({ contactPoints: ['cassandra-node1', 'cassandra-node2'], keyspace: 'MyCassandraCluster', localDataCenter: 'dc1', });
    this.client.connect().then(()=>{console.log('connected')}).catch((e) => {console.error(e);
    });
    
  }


  createClient(client: Customer): void {}
  readClients(): Customer[] { return []; }
  readClient(id: string): Customer[] { return []; }
  updateClient(id: string, client: Customer): void {}
  deleteClient(id: string): void {}
}

export default CustomerRepository;
