import Customer from "../model/Customer";
import { Client } from 'cassandra-driver';

class CustomerRepository {

  client: Client;

  constructor(){
    this.client = new Client({ contactPoints: ['localhost:9042', 'localhost:9043'], keyspace: 'nbd', localDataCenter: 'datacenter1', });
    this.client.connect().then(()=>{console.log('connected')}).catch((e) => {console.error(e);});
  }


  createClient(customer: Customer): void {
    const query: string = `INSERT INTO customers (id, name) VALUES (${customer.id}, ${customer.name})`;
  }
  readClients(): Customer[] { return []; }
  readClient(id: string): Customer[] { return []; }
  updateClient(id: string, client: Customer): void {}
  deleteClient(id: string): void {}
}

export default CustomerRepository;
