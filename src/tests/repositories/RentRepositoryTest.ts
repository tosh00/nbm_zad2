import assert from "assert";
import Customer from "../../model/Customer";
import Product from "../../model/Product";
import Rent from "../../model/Rent";
import CustomerRepository from "../../repositories/CustomerRepository";
import ProductRepository from "../../repositories/ProductRepository";
import RentRepository from "../../repositories/RentRepository";
import { testLog } from "../utils/logger";

const PREFIX = 'Rent repository Test';

const log = testLog(PREFIX);

export default async function RentTests() {
  await createDeleteTest();
}

async function createDeleteTest() {
  const pr = new ProductRepository(); 
  const cr = new CustomerRepository();

  pr.connect();
  cr.connect();

  const rr = new RentRepository(pr, cr);

  const customer = new Customer("name");
  const product = new Product("product", 100);

  await pr.createProduct(product);
  await cr.createClient(customer);

  const rent = new Rent(customer.id, product.id);

  const addRentResult = await rr.createRent(rent);

  log("Test 1 completed!");
}