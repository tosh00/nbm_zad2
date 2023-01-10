import { Client, types } from "cassandra-driver";
import Rent from "../model/Rent";
import CustomerRepository from "./CustomerRepository";
import ProductRepository from "./ProductRepository";

class RentRepository {
  client: Client;
  private productRepository: ProductRepository;
  private customerRepository: CustomerRepository;

  constructor(productRepository: ProductRepository, customerRepository: CustomerRepository) {
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
    const {id, productId, customerId, endDate, startDate} = rent;
    const customerExist = await this.customerExist(customerId);
    const productExist = await this.productExist(productId);

    if (!customerExist || !productExist) return;

    const createQuery = `INSERT INTO rents (id, customerid, enddate, productid, startdate) VALUES (?, ?, ?, ?, ?);`;

    const result = await this.client.execute(createQuery, [id, customerId, endDate, productId, startDate]);
    
    return result;
  }
  readRents(): Rent[] { return []; }
  readRent(id: string): Rent[] { return []; }
  endRent(id: string): void {}
  deleteRent(id: string): void {}

  private async customerExist(customerId: string): Promise<boolean> {
    const [customer] = await this.customerRepository.readClient(customerId);
    return !!customer;
  }

  private async productExist(productId: string): Promise<boolean> {
    const [product] = await this.productRepository.readProduct(productId);
    return !!product;
  }
}

export default RentRepository;
