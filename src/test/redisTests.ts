import Movie from "../product/Movie";
import Music from "../product/Music";
import Cache from "../cache/Cache";
import assert from "assert";

const PREFIX = 'Redis Test';

export default async function init() {
  await redisBasicTest();
  await clearCacheTest();
}

async function redisBasicTest () {
  const redisInstance = new Cache();
  redisInstance.connect();
  const product = new Music('music 1', 12, 'ddda', 'gfd');

  await redisInstance.setProduct(product);
  const productFromCache = await redisInstance.getProduct(product.id);
 

  assert(product.id === productFromCache?.id, `Products are not the same: ${product.id} - ${productFromCache?.id}`);
  testLog('test 1 completed');
}

async function clearCacheTest() {
  const redisInstance = new Cache();
  redisInstance.connect();
  const product = new Music('music 1', 12, 'ddda', 'gfd');

  await redisInstance.setProduct(product, 1000);

  await redisInstance.clearCache();

  const productFromCache = await redisInstance.getProduct(product.id);

  assert(productFromCache === undefined, "Cache isn't clear!");
  testLog('test 2 completed');
}

// helpers
function testLog(desc = 'test completed!') { 
  console.log(`${PREFIX} - ${desc}`);
}
