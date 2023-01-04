import Rent from "../model/Rent";

class RentRepository {
  createRent(rent: Rent): void {}
  readRents(): Rent[] { return []; }
  readRent(id: string): Rent[] { return []; }
  endRent(id: string): void {}
  deleteRent(id: string): void {}
}

export default RentRepository;
