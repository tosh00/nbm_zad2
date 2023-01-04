import assert from "assert";
import CustomerRepository from "../../repositories/CustomerRepository";
import { testLog } from "../utils/logger";

const PREFIX = 'Customer repository Test';

const log = testLog(PREFIX);

export default function CustomerTests() {
  customerRepositoryTest();
}

function customerRepositoryTest() {
  const cr =  new CustomerRepository();
  log("Test 1 completed!");
  
}
