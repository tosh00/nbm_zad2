import dotenv from 'dotenv';
import { createClient } from 'redis'
import Product from '../product/Product';

dotenv.config();

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost';
const REDIS_PORT = process.env.REDIS_PORT || '6379';

const PRODUCTS_KEY = 'products';

class Cache {
  private client = createClient({
    url: `${REDIS_URL}:${REDIS_PORT}`
  });

  constructor() {
    this.addEvents();
    this.connect();
  }

  async connect() {
    await this.client.connect();
  }

  addEvents() {
    this.client.on('error', (err) => console.log('Redis Client Error', err));
    this.client.on('connect', () => {
      console.log('Redis connected!');
    });
  }

  async setProduct(product: Product) {
    await this.client.set(product.id, JSON.stringify(product));
    await this.client.expire(product.id, 600);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const res = await this.client.get(id) as string;
    return JSON.parse(res);
  }
}

export default Cache;
