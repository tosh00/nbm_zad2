import clientTests from './model/ClientTests';
import productTests from './model/ProductTests';
import rentTests from './model/RentTests';
import customerRepositoryTests from './repositories/CustomerRepositoryTest';
import productRepositoryTests from './repositories/ProductRepositoryTest';
import rentRepositoryTests from './repositories/RentRepositoryTest';
import { greenBg } from './utils/logger';


(async () => {
  console.log(`------------- ${greenBg(" Tests Start ")} -------------\n`);
  
  clientTests();
  productTests();
  rentTests();
  // await customerRepositoryTests();
  // await productRepositoryTests();
  await rentRepositoryTests();

  console.log(`\n------------- ${greenBg("  Tests End  ")} -------------`);
})();