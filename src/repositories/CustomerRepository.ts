import Customer from "../model/Customer";
import { Client, types } from "cassandra-driver";

class CustomerRepository {
  client: Client;

  constructor() {
    this.client = new Client({
      contactPoints: ["localhost:9042", "localhost:9043"],
      keyspace: "nbd",
      localDataCenter: "datacenter1",
    });
  }

  async connect(): Promise<void> {
    await this.client
      .connect()
      .then(() => {
        // console.log("connected");
      })
      .catch((e) => {
        console.error(e);
      });
  }

  async disconnect(): Promise<void> {
    await this.client.shutdown();
  }

  async createClient(customer: Customer): Promise<types.ResultSet> {
    const query: string = `INSERT INTO customers (id, name) VALUES (?, ?);`;
    const result = await this.client.execute(query, [customer.id, customer.name]);

    return result;
  }

  async readClients(): Promise<Customer[]> {
    const readAllQuery = `SELECT * FROM customers;`;

    const result = await this.client.execute(readAllQuery);

    const customers: Customer[] = result.rows.map((row: types.Row) => {
      const id = (row.get('id') as types.Uuid).toString();
      const name = row.get('name');

      return new Customer(name, id);
    });

    return customers;
  }
  
  async readClient(id: string): Promise<Customer[]> {
    const readCustomerQuery = `SELECT * FROM customers WHERE id=?;`;

    const result = await this.client.execute(readCustomerQuery, [id]);

    const customer: Customer[] = result.rows.map((row: types.Row) => {
      const id = (row.get('id') as types.Uuid).toString();
      const name = row.get('name');

      return new Customer(name, id);
    });

    return customer;
  }

  async updateClientName(id: string, name: String): Promise<types.ResultSet> {
    const updateQuery = `UPDATE customers SET name=? WHERE id=?;`;

    const result = await this.client.execute(updateQuery, [name, id]);

    return result;
  }
  
  async deleteClient(id: string): Promise<types.ResultSet> {
    const deleteQuery = `DELETE FROM customers WHERE id=?;`;
    const result = await this.client.execute(deleteQuery, [id]);

    return result;
  }
}

export default CustomerRepository;
