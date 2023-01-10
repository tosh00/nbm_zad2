import assert from "assert";
import Product from "../../model/Product";
import ProductRepository from "../../repositories/ProductRepository";
import { testLog } from "../utils/logger";

const PREFIX = 'Product repository Test';

const log = testLog(PREFIX);

export default async function ProductTests() {
  await createDeleteTest();
}

async function createDeleteTest() {
  const pr = new ProductRepository();
  const product = new Product("Gra", 100.5);

  await pr.connect();
  const addResult = await pr.createProduct(product);
  const [testingProduct] = await pr.readProduct(product.id);
  const rowsNumberAfterAdd = (await pr.readProducts()).length;
  const deleteResult = await pr.deleteProduct(product.id);
  const rowsNumberAfterDelete = (await pr.readProducts()).length;
  await pr.disconnect();

  assert(rowsNumberAfterAdd === rowsNumberAfterDelete + 1, "Add/delete methods error!");
  assert(product.id === testingProduct?.id, "Read product error (id's are the same)!");
  assert(!addResult.info.warnings, "There are some warning during creating a product!");
  assert(!deleteResult.info.warnings, "There are some warning during deleting a product!");

  log("Test 1 completed!");
}