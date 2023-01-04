import clientTests from './model/ClientTests';
import productTests from './model/ProductTests';
import rentTests from './model/RentTests';
import CustomerTests from './repositories/CustomerRepositoryTest';


(() => {
  clientTests();
  productTests();
  rentTests();
  CustomerTests();
})();