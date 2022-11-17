import mongoose from "mongoose";
import Customer from "../customer/Customer";
import Product from "../product/Product";

const SECONDS_IN_DAY = 86400;

class Rent {
  private _id: string;
  private _beginTime: Date;
  private _endTime?: Date;
  private _customer: Customer;
  private _product: Product;

  constructor( customer: Customer, product: Product, beginTime: Date = new Date(), endTime = undefined) {
    this._id = new mongoose.Types.ObjectId().toString();
    this._customer = customer;
    this._product = product;
    this._beginTime = beginTime;
    this._endTime = endTime;
  }

  // getters
  get rentCost(): number {
    return this._customer.applyDiscount(
      this._product.getActualPrice?.() ?? this._product.basePrice
    );
  }

  get id() {
    return this._id;
  }
  
  get rentDays(): number {
    const timeDiffInMs = (this._endTime?.valueOf() ?? new Date().valueOf() ) - this._beginTime.valueOf();
    return timeDiffInMs / SECONDS_IN_DAY;
  }

  get beginTime(): Date {
    return this._beginTime;
  }


  get customer() {
    return this._customer;
  }

  get product() {
    return this._product;
  }

 // setters
  set id(id){
    this._id = id;
  }
  set endTime(time: Date) {
    this._endTime = time;
  }

  // public
  endRent(): void {
    this._endTime = new Date();
  }

  getEndTime(): Date | undefined {
    return this._endTime;
  }
}

export default Rent;
