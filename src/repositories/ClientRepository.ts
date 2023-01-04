import Client from "../model/Client";

class ClientRepository {
  createClient(client: Client): void {}
  readClients(): Client[] { return []; }
  readClient(id: string): Client[] { return []; }
  updateClient(id: string, client: Client): void {}
  deleteClient(id: string): void {}
}

export default ClientRepository;
