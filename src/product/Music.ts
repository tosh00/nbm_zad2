import Product from "./Product";

const MUSIC_MULTIPLIER = 1.45;

class Music extends Product {
  constructor(serialNumber: string, basePrice: number, title: string, category: string, id?: string) {
    super(serialNumber, basePrice, title, category, id);
  }

  getProductInfo(): string {
    return `Music: ${this.title}, ${this.category}`;
  }

  getActualPrice(): number {
    return this.basePrice * MUSIC_MULTIPLIER;
  }
}

export default Music;