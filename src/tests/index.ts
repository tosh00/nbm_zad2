import clientTests from './model/ClientTests';
import productTests from './model/ProductTests';
import rentTests from './model/RentTests';
import CustomerRepositoryTests from './repositories/CustomerRepositoryTest';
import { greenBg } from './utils/logger';


(async () => {
  console.log(`------------- ${greenBg(" Tests Start ")} -------------\n`);
  

  clientTests();
  productTests();
  rentTests();
  await CustomerRepositoryTests();

  console.log(`\n------------- ${greenBg("  Tests End  ")} -------------`);
})();