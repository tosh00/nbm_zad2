import assert from "assert";
import Customer from "../../model/Customer";
import CustomerRepository from "../../repositories/CustomerRepository";
import { testLog } from "../utils/logger";

const PREFIX = 'Customer repository Test';

const log = testLog(PREFIX);

export default function CustomerTests() {
  customerRepositoryTest();
}

function customerRepositoryTest() {
  const cr =  new CustomerRepository();
  const c = new Customer("Joe")
  cr.createClient(c)
  log("Test 1 completed!");
  
}
