import uuid4 from 'uuid4';

class Rent {
  id: string;
  customerId: string;
  productId: string;
  startDate: number;
  endDate: number;

  constructor(clientId: string, productId: string, id: string = uuid4()) {
    this.id = id;
    this.customerId = clientId;
    this.productId = productId;
    this.startDate = Date.now();
  }

  endRent() {
    this.endDate = Date.now();
  }

  getRentPrice() {
    if (!this.endRent) {
      return 0;
    }

    // to do
  }
}

export default Rent;
