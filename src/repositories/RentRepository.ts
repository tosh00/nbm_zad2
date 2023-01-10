import { Client, types } from "cassandra-driver";
import Rent from "../model/Rent";
import CustomerRepository from "./CustomerRepository";
import ProductRepository from "./ProductRepository";

class RentRepository {
  client: Client;
  private productRepository: ProductRepository;
  private customerRepository: CustomerRepository;

  constructor(
    productRepository: ProductRepository,
    customerRepository: CustomerRepository
  ) {
    this.client = new Client({
      contactPoints: ["localhost:9042", "localhost:9043"],
      keyspace: "nbd",
      localDataCenter: "datacenter1",
    });

    this.productRepository = productRepository;
    this.customerRepository = customerRepository;

    if (!this.productRepository.connected) {
      this.productRepository.connect();
    }

    if (!this.customerRepository.connected) {
      this.customerRepository.connect();
    }
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

  async createRent(rent: Rent): Promise<types.ResultSet> {
    const { id, productId, customerId, endDate, startDate } = rent;
    const customerExist = await this.customerExist(customerId);
    const productExist = await this.productExist(productId);

    if (!customerExist || !productExist) return;

    const createQuery = `INSERT INTO rents (id, customerid, enddate, productid, startdate) VALUES (?, ?, ?, ?, ?);`;

    const result = await this.client.execute(createQuery, [
      id,
      customerId,
      endDate,
      productId,
      startDate,
    ]);

    return result;
  }

  async readRents(): Promise<Rent[]> {
    const getQuery = 'SELECT * FROM rents;';
    const result: types.ResultSet = await this.client.execute(getQuery);

    const rents: Rent[] = result.rows.map((row: types.Row) => {
      const id = (row.get('id') as types.Uuid).toString();
      const customerId = row.get('customerid');
      const productid = row.get('productid');
      const enddate = Number(row.get('enddate'));
      const startdate = Number(row.get('startdate'));

      return new Rent(customerId, productid, id, startdate, enddate);
    });

    return rents;
  }

  async readRent(id: string): Promise<Rent[]> {
    const getQuery = 'SELECT * FROM rents WHERE id=?;';
    const result: types.ResultSet = await this.client.execute(getQuery, [id]);
    
    const rents: Rent[] = result.rows.map((row: types.Row) => {
      const id = (row.get('id') as types.Uuid).toString();
      const customerId = row.get('customerid');
      const productid = row.get('productid');
      const enddate = Number(row.get('enddate'));
      const startdate = Number(row.get('startdate'));

      return new Rent(customerId, productid, id, startdate, enddate);
    });

    return rents;
  }

  async endRent(id: string): Promise<types.ResultSet> {
    const rentEnded = await this.rentEnded(id);
    if (rentEnded) return;

    const endDateTimestamp = Date.now();
    const endRentQuery = `UPDATE rents SET enddate=? WHERE id=?;`;
    const result = this.client.execute(endRentQuery, [endDateTimestamp, id]);

    return result;
  }

  async deleteRent(id: string): Promise<types.ResultSet> {
    const rentEnded = await this.rentEnded(id);
    if (!rentEnded) return;

    const deleteQuery = `DELETE FROM rents WHERE id=?;`;
    const result = this.client.execute(deleteQuery, [id]);

    return result;
  }

  private async customerExist(customerId: string): Promise<boolean> {
    const [customer] = await this.customerRepository.readClient(customerId);
    return !!customer;
  }

  private async productExist(productId: string): Promise<boolean> {
    const [product] = await this.productRepository.readProduct(productId);
    return !!product;
  }

  private async rentEnded(id: string): Promise<boolean> {
    const [rent] = await this.readRent(id);

    return rent.endDate !== 0;
  }
}

export default RentRepository;
