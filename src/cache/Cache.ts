import dotenv from "dotenv";
import { createClient } from "redis";
import BoardGame from "../product/BoardGame";
import Movie from "../product/Movie";
import Music from "../product/Music";
import Product from "../product/Product";
import VideoGame from "../product/VideoGame";
import Game from '../product/Game';
import DifficultyLevel from "../product/DifficultyLevel";

dotenv.config();

const REDIS_URL = process.env.REDIS_URL || "redis://localhost";
const REDIS_PORT = process.env.REDIS_PORT || "6379";

const REDIS_PRODUCTS_KEY = 'productsIds';

enum ProductsTypes {
  MUSIC = "Music",
  BOARD_GAME = "BoardGame",
  MOVIE = "Movie",
  VIDEO_GAME = "VideoGame"
};

interface WriteObject {
  type: ProductsTypes;
  payload: Product | Game;
}

class Cache {
  private client = createClient({
    url: `${REDIS_URL}:${REDIS_PORT}`,
  });

  constructor() {
    this.addEvents();
  }

  async connect(): Promise<boolean> {
    try {
      await this.client.connect();
      return true;
    } catch (err) {
      return false;
    }
  }

  isConnected(){
    return this.client.isOpen;
  }

  addEvents() {
    this.client.on("error", (err) => console.log("Redis Client Error", err));
    this.client.on("connect", () => {
    });
  }

  async setProduct(product: Product | Game, expire = 600) {
    if(!this.client.isOpen) return;
    const objectToWrite: WriteObject = {
      type: product.constructor.name as ProductsTypes,
      payload: product,
    }

    this.addProductId(product.id);

    await this.client.set(
      product.id,
      JSON.stringify(objectToWrite)
    );

    await this.client.expire(product.id, expire);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    if(!this.client.isOpen) return undefined;
    const res = (await this.client.get(id)) as string;
    const obj = await (JSON.parse(res)) as WriteObject;

    if (obj) {
      const {_id, _basePrice, _category, _serialNumber, _title} = obj.payload;

      switch(obj.type) {
        case ProductsTypes.MOVIE:
          return new Movie(_serialNumber, _basePrice, _title, _category, _id);
        case ProductsTypes.MUSIC:
          return new Music(_serialNumber, _basePrice, _title, _category, _id);
        case ProductsTypes.BOARD_GAME:
          return new BoardGame(_serialNumber, _basePrice, _title, _category, (obj.payload as Game)._difficultyLevel ,_id);
        case ProductsTypes.VIDEO_GAME:
          return new VideoGame(_serialNumber, _basePrice, _title, _category, (obj.payload as Game)._difficultyLevel ,_id);
      }
    }

    return undefined;
  }

  async getProductsIdsArray(): Promise<string[]> {
    if(!this.client.isOpen) return [];
    const res = await this.client.get(REDIS_PRODUCTS_KEY);
    const arr = res ? await JSON.parse(res) as string[] : [];

    const newArr = arr.filter(async (id) => {
      const obj = await this.getProduct(id);

      return !!obj;
    });

    this.client.set(REDIS_PRODUCTS_KEY, JSON.stringify(newArr));

    return newArr;
  }

  async addProductId(id: string) {
    if(!this.client.isOpen) return;
    const arr = await this.getProductsIdsArray();
    const newArr = [...arr, id];

    this.client.set(REDIS_PRODUCTS_KEY, JSON.stringify(newArr));
  }

  async productInCache(id: string) {
    if(!this.client.isOpen) return;
    const arr = await this.getProductsIdsArray();
    return arr.includes(id);
  }

  async clearCache() {
    if(!this.client.isOpen) return;
    const ids = await this.getProductsIdsArray();
    if(!ids.length) return;
    await this.client.del(ids);
    await this.client.set(REDIS_PRODUCTS_KEY, JSON.stringify([]));
  }
}

export default Cache;
