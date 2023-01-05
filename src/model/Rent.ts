import uuid4 from "uuid4";
import Customer from "./Customer";
import Product from "./Product";

class Rent {
  id: string;
  customer: Customer;
  product: Product;
  startDate: number;
  endDate: number;

  constructor(customer: Customer, product: Product, id: string = uuid4()) {
    this.id = id;
    this.customer = customer;
    this.product = product;
    this.startDate = Date.now();
  }

  rentEnded() {
    return !!this.endDate;
  }

  endRent() {
    this.endDate = Date.now();
  }

  getRentPrice() {
    const endDate = !this.rentEnded ? Date.now() : this.endDate;

    const rentDays = this.getNumbersOfDays(this.startDate, endDate);
    return rentDays * this.product.price;
  }

  private getNumbersOfDays(begin: number, end: number) {
    const milisecondsPerDay = 1000 * 60 * 60 * 24;
    return Math.ceil((end - begin) / milisecondsPerDay);
  }
}

export default Rent;
