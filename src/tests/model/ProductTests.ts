import assert from "assert";
import Product from "../../model/Product";
import { testLog } from "../utils/logger";

const PREFIX = 'Product Test';

const log = testLog(PREFIX);

export default function productTests() {
  productConstructorTest();
}

function productConstructorTest() {
  const productInstance = new Product('product1', 10);
  const productInstance2 = new Product('product2', 10);

  assert(productInstance.id !== productInstance2.id, 'Products cannot be the same')
  log('Test 1 completed!');
}
