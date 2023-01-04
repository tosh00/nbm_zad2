import Product from "../model/Product";

class ProductRepository {
  createProduct(product: Product): void {}
  readProducts(): Product[] { return []; }
  readProduct(id: string): Product[] { return []; }
  updateProduct(id: string, product: Product): void {}
  deleteProduct(id: string): void {}
}

export default ProductRepository;
