import uuid4 from 'uuid4';

class Rent {
  id: string;
  customerId: string;
  productId: string;
  startDate: number;
  endDate: number;

  constructor(clientId: string, productId: string, id: string = uuid4(), startDate: number = Date.now(), endDate: number = 0) {
    this.id = id;
    this.customerId = clientId;
    this.productId = productId;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  // endRent(timestamp: number = Date.now()) {
  //   if (timestamp > this.startDate) {
  //     this.endDate = timestamp;
  //   }
  // }

  getRentPrice() {
    // if (!this.endRent) {
    //   return 0;
    // }

    // to do
  }
}

export default Rent;
