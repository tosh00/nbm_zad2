import assert from "assert";
import Client from "../../model/Client";
import Product from "../../model/Product";
import Rent from "../../model/Rent";
import { testLog } from "../utils/logger";

const PREFIX = 'Rent Test';

const log = testLog(PREFIX);

export default function rentTests() {
  rentConstructorTest();
}

function rentConstructorTest() {
  const client1 = new Client('name 1');
  const client2 = new Client('name 2');

  const product1 = new Product('product 1', 10);
  const product2 = new Product('product 1', 11);

  const rentInstance1 = new Rent(client1.id, product1.id);
  const rentInstance2 = new Rent(client2.id, product2.id);

  assert(rentInstance1.id !== rentInstance2.id, 'Rents cannot be the same')
  log('Test 1 completed!');
}
