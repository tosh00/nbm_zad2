import mongoose, {Schema} from "mongoose";
import { config } from "./config/config";
import Address from "./customer/Address";
import Customer from "./customer/Customer";
import Gold from "./customer/CustomerType/Gold";
import DifficultyLevel from "./product/DifficultyLevel";
import Music from "./product/Music";
import Product from "./product/Product";
import VideoGame from "./product/VideoGame";
import Rent from "./rent/Rent";
import CustomerRepository from "./repositories/CustomerRepository";
import ProductRepository from "./repositories/ProductRepository";
import RentRepository from "./repositories/RentRepository";



// const m = new Music('222', 12, 'dsa', 'biiadosa');
// const v = new VideoGame('asd', 12, 'dsa', 'biiadosa', DifficultyLevel['Easy']);

// const a = new Address('Łódź', '9', 'al. Politechniki');

// const c = new Customer('Mariusz', 'Pudzianowski', '2137', a);






// const r = new Rent(c, m, new Date());
// rentRepo.add(r)

// const ct = new Gold()
// c.CustomerType = ct;


// customerRepo.add(c);
// console.log(r);

// rentRepo.get(0).then(console.log)

const main = async ()=>{

    console.log('xd');
    

    const productRepo = new ProductRepository();
    const customerRepo = new CustomerRepository();
    const rentRepo = new RentRepository();    

    const m = new Music('asda', 12, 'ddda', 'gfd');

    productRepo.add(m)

    // const c = await customerRepo.get(0);
    // const p = await productRepo.get(0);
    // console.log(c, p);

    // if(!p || !c) return
    // const r = new Rent(c, p, new Date());

    // rentRepo.add(r);

    const x = await rentRepo.get(0);
    console.log(x);
    

}

main();