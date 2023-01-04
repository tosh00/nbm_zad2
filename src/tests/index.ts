import clientTests from './model/ClientTests';
import productTests from './model/ProductTests';
import rentTests from './model/RentTests';

(() => {
  clientTests();
  productTests();
  rentTests();
})();