import assert from "assert";
import Customer from "../../model/Customer";
import Product from "../../model/Product";
import Rent from "../../model/Rent";
import CustomerRepository from "../../repositories/CustomerRepository";
import ProductRepository from "../../repositories/ProductRepository";
import RentRepository from "../../repositories/RentRepository";
import { redString, testLog } from "../utils/logger";

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

  await rr.createRent(rent);
  const rentsNumber1 = (await rr.readRents()).length;
  await rr.deleteRent(rent.id);
  const rentsNumber2 = (await rr.readRents()).length;

  assert(rentsNumber1 === rentsNumber2, redString(`Rents number are not equal! Expected: ${rentsNumber1}, Current: ${rentsNumber2}`));

  await rr.endRent(rent.id);
  await rr.deleteRent(rent.id);

  const rentsNumber3 = (await rr.readRents()).length;

  assert(rentsNumber2 === rentsNumber3 + 1, "Something wrong with deleting rents!")

  log("Test 1 completed!");
}