import { Client, types } from "cassandra-driver";
import Product from "../model/Product";

class ProductRepository {
  client: Client;
  connected: boolean = false;

  constructor() {
    this.client = new Client({
      contactPoints: ["localhost:9042", "localhost:9043"],
      keyspace: "nbd",
      localDataCenter: "datacenter1",
    });
  }

  async connect(): Promise<void> {
    await this.client
      .connect()
      .then(() => {
        this.connected = true;
        // console.log("connected");
      })
      .catch((e) => {
        console.error(e);
      });
  }

  async disconnect(): Promise<void> {
    await this.client.shutdown();
  }

  async createProduct(product: Product): Promise<types.ResultSet> {
    const { id, price, productName } = product;
    const query: string = `INSERT INTO products (id, price, productname) VALUES (?, ?, ?);`;
    const result = await this.client.execute(query, [id, price, productName]);

    return result;
  }

  async readProducts(): Promise<Product[]> {
    const readAllQuery = `SELECT * FROM products;`;

    const result = await this.client.execute(readAllQuery);

    const products: Product[] = result.rows.map((row: types.Row) => {
      const id = (row.get("id") as types.Uuid).toString();
      const price = row.get("price");
      const productName = row.get("productname");

      return new Product(productName, price, id);
    });

    return products;
  }

  async readProduct(id: string): Promise<Product[]> {
    const readSingleQuery = `SELECT * FROM products WHERE id=?;`;

    const result = await this.client.execute(readSingleQuery, [id]);

    const product: Product[] = result.rows.map((row: types.Row) => {
      const id = (row.get("id") as types.Uuid).toString();
      const price = row.get("price");
      const productName = row.get("productname");

      return new Product(productName, price, id);
    });

    return product;
  }

  async updateProduct(
    id: string,
    price: number,
    productName: string
  ): Promise<types.ResultSet> {
    const updateQuery = `UPDATE products SET price=?, productname=?  WHERE id=?;`;

    const result = await this.client.execute(updateQuery, [
      price,
      productName,
      id,
    ]);

    return result;
  }

  async updateProductPrice(id: string, price: number) {
    const updateQuery = `UPDATE products SET price=? WHERE id=?;`;

    const result = await this.client.execute(updateQuery, [price, id]);

    return result;
  }

  async updateProductName(id: string, name: string) {
    const updateQuery = `UPDATE products SET productname=? WHERE id=?;`;

    const result = await this.client.execute(updateQuery, [name, id]);

    return result;
  }

  async deleteProduct(id: string): Promise<types.ResultSet> {
    const deleteQuery = `DELETE FROM products WHERE id=?;`;
    const result = await this.client.execute(deleteQuery, [id]);

    return result;
  }
}

export default ProductRepository;
