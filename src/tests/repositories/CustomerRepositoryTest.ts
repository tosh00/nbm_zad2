import assert from "assert";
import Customer from "../../model/Customer";
import CustomerRepository from "../../repositories/CustomerRepository";
import { testLog } from "../utils/logger";

const PREFIX = 'Customer repository Test';

const log = testLog(PREFIX);

export default async function CustomerTests() {
  await customerRepositoryTest();
  await readTest();
  await updateTest();
}

async function customerRepositoryTest() {
  const cr =  new CustomerRepository();
  const c = new Customer("Joe");

  await cr.connect();
  const createResult = await cr.createClient(c);
  const deleteResult = await cr.deleteClient(c.id);

  assert(!createResult.info.warnings, "Thera are warnings during creating new customer to the database!");
  assert(!deleteResult.info.warnings, "Thera are warnings during deleting new customer to the database!");

  log("Test 1 completed!");

  await cr.disconnect();
}

async function readTest() {
  const cr =  new CustomerRepository();
  const c = new Customer("Joe");

  await cr.connect();

  const startClientsNumber = (await cr.readClients()).length;

  await cr.createClient(c);

  const endClientsNumber = (await cr.readClients()).length;
  const [testingCustomer] = await cr.readClient(c.id);

  await cr.deleteClient(c.id);

  assert(startClientsNumber + 1 === endClientsNumber, "Clients numbers are wrong!");
  assert(c.id === testingCustomer?.id, "Clients id's are not the same");

  log("Test 2 completed!");

  await cr.disconnect();
}

async function updateTest() {
  const NEW_NAME = "New name";
  const cr =  new CustomerRepository();
  const c = new Customer("Joe");

  await cr.connect();
  await cr.createClient(c);

  await cr.updateClientName(c.id, NEW_NAME);
  const [testingClient] = await cr.readClient(c.id);

  assert(testingClient.id === c.id, "Clients are not the same!");
  assert(testingClient.name === NEW_NAME, "New name is not set!");

  await cr.deleteClient(c.id);
  await cr.disconnect();

  log("Test 3 completed!");
}
