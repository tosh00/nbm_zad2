import assert from "assert";
import Client from "../../model/Client";
import { testLog } from "../utils/logger";

const PREFIX = 'Client Test';

const log = testLog(PREFIX);

export default function clientTests() {
  clientConstructorTest();
}

function clientConstructorTest() {
  const clientInstance = new Client('jhon');
  const clientInstance2 = new Client('jhon2');

  assert(clientInstance.id !== clientInstance2.id, 'Clients cannot be the same');
  log('Test 1 completed!');
}
