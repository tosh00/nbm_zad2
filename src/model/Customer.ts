import uuid4 from "uuid4";

class Customer {
  id: string;
  name: string;

  constructor(name: string, id: string = uuid4()) {
    this.name = name;
    this.id = id;
  }
}

export default Customer;