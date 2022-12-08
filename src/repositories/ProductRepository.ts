import Product from "../product/Product";
import { IRepository } from "./Repository.type";
import Movie from "../product/Movie";
import Music from "../product/Music";
import DifficultyLevel from "../product/DifficultyLevel";
import VideoGame from "../product/VideoGame";
import BoardGame from "../product/BoardGame";
import Game from "../product/Game";
import mongoose, { Schema } from "mongoose";
import { config } from "../config/config";
import { it } from "node:test";
import ProductsCache from "../cache/Cache";

type makeProductProps = {
  className: string;
  basePrice: number;
  title: string;
  category: string;
  serialNumber: string;
  difficultyLevel: string | undefined;
};

interface IProduct {
  className: string;
  basePrice: number;
  title: string;
  category: string;
  serialNumber: string;
  difficultyLevel: string | undefined;
}

const productSchema = new Schema<IProduct>(
  {
    className: {
      type: String,
      required: true,
      enum: ["BoardGame", "VideoGame", "Movie", "Music"],
    },
    basePrice: { type: Number, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    serialNumber: { type: String, required: true },
    difficultyLevel: {
      type: String,
      required: false,
      enum: ["Easy", "Medium", "Hard", "VeryHard"],
    },
  },
  {
    versionKey: false,
  }
);

class ProductRepository {
    static productsCollection: mongoose.Model<IProduct> = mongoose.model<IProduct>('Product', productSchema);

  constructor() {
    mongoose.connect(config.mongo.url);
  }

  static makeProduct(
    {
      className,
      basePrice,
      title,
      category,
      serialNumber,
      difficultyLevel,
    }: makeProductProps,
    _id: string
  ): Product | null {
    let difficulty: DifficultyLevel;
    let product: Product;
    switch (className) {
      case "Movie":
        product = new Movie(serialNumber, basePrice, title, category);
        product.id = _id;
        return product;

            case "Music":
                product = new Music( serialNumber,basePrice,title,category)
                product.id = _id;
                return product;
            case "BoardGame":
                difficulty = DifficultyLevel[difficultyLevel as keyof typeof DifficultyLevel];                
                product = new BoardGame( serialNumber,basePrice,title,category, difficulty)
                product.id = _id;
                return product;
            case "VideoGame":
                difficulty = DifficultyLevel[difficultyLevel as keyof typeof DifficultyLevel];
                product = new VideoGame( serialNumber,basePrice,title,category, difficulty)
                product.id = _id;
                return product;        }

    return null;
  }

  async get(index: number): Promise<Product | null> {
    const results = await ProductRepository.productsCollection.find();
    if (!results || results.length < 1 || results.length <= index) {
      return null;
    }
    
    const x = results[index];

    return ProductRepository.makeProduct(x, x._id.toString());
  }

  async add(item: Product): Promise<void> {
    const { ...props }: any = item;

    // props.className = item.constructor.name;

    let newProps = {
      _id: new mongoose.Types.ObjectId(props._id),
      basePrice: props._basePrice,
      title: props._title,
      category: props._category,
      serialNumber: props._serialNumber,
      className: item.constructor.name,
      difficultyLevel: props._difficultyLevel,
    };

    // props._id = item.id;
    const toAdd = new ProductRepository.productsCollection(newProps);

    await toAdd.save();
  }


    async remove(item: Product): Promise<void> {
        await ProductRepository.productsCollection.findOneAndRemove({serialNumber: item.serialNumber})
        .catch((e)=>{console.error(e);})
        
    }
    async size(): Promise<number> {
        return await ProductRepository.productsCollection.countDocuments();
    }
    async getAll(): Promise<Product[]>{
         let results = await ProductRepository.productsCollection.find();
         let mapped = results.map(item => { return ProductRepository.makeProduct(item, item._id.toString())})
         return  mapped.filter((item): item is Product => item != null);
    }

  async findBy(filterFunction: (item: Product) => boolean) {
    let allProducts = await this.getAll();
    return allProducts.filter(filterFunction)[0];
  }

  async findBySerialNumber(number: string): Promise<Product | null> {
    // return await this.findBy((item)=>number === item.serialNumber)

    const x = await ProductRepository.productsCollection.findOne({
      serialNumber: number,
    });
    if (!x) return null;
    const y = await ProductRepository.makeProduct(x, x._id.toString());

    return y;
  }

  async findById(id: string): Promise<Product | null> {
    // return  await this.findBy((item)=>id === item.id)

    const x = await ProductRepository.productsCollection.findById(id);
    if (!x) return null;
    const y = await ProductRepository.makeProduct(x, x._id.toString());

    return y;
  }
}

export default ProductRepository;
