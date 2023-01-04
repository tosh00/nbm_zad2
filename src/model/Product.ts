import uuid4 from "uuid4";

class Product {
  id: string;
  productName: string;
  price: number;

  constructor(productName: string, price: number, id: string = uuid4()) {
    this.productName = productName;
    this.price = price;
    this.id = id;
  }
}

export default Product;
