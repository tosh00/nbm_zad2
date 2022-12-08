import mongoose from "mongoose";
import uuid4 from "uuid4";

abstract class Product {
  _id: string;
  _basePrice: number;
  _title: string;
  _category: string;
  _serialNumber: string;

  constructor(serialNumber: string, basePrice: number, title: string, category: string, id: string = new mongoose.Types.ObjectId().toString()) {
    this._id = id;
    this._basePrice = basePrice;
    this._title = title;
    this._category = category;
    this._serialNumber = serialNumber;
  }

  // getters
  get id() {
    return this._id;
  }

  get basePrice() {
    return this._basePrice;
  }

  get title() {
    return this._title;
  }

  get category() {
    return this._category;
  }

  get serialNumber() {
    return this._serialNumber;
  }

  // setters
  
  set id(id){
    this._id = id;
  }

  set basePrice(basePrice) {
    this._basePrice = basePrice;
  }

  set title(title) {
    this._title = title;
  }

  set category(category) {
    this._category = category;
  }

  getActualPrice?(): number;
  getProductInfo?(): string;
  
}

export default Product;
