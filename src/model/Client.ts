import uuid4 from "uuid4";

class Client {
  id: string;
  name: string;

  constructor(name: string, id: string = uuid4()) {
    this.name = name;
    this.id = id;
  }
}

export default Client;
