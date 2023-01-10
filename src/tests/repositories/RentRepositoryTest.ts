import assert from "assert";
import Product from "../../model/Product";
import ProductRepository from "../../repositories/ProductRepository";
import { testLog } from "../utils/logger";

const PREFIX = 'Customer repository Test';

const log = testLog(PREFIX);

export default async function CustomerTests() {
}

async function createDeleteTest() {
  const pr = new ProductRepository();
  const product = new Product("Gra", 100);
}