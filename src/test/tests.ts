import assert from "assert";
import Address from "../customer/Address";
import Customer from "../customer/Customer";
import CustomerManager from "../managers/CustomerManager";
import BoardGame from "../product/BoardGame";
import DifficultyLevel from "../product/DifficultyLevel";
import Movie from "../product/Movie";
import Music from "../product/Music";
import Product from "../product/Product";
import VideoGame from "../product/VideoGame";
import ProductRepository from "../repositories/ProductRepository";
import Gold from '../customer/CustomerType/Gold';import CustomerRepository from "../repositories/CustomerRepository";
import { exit } from "process";
import Rent from "../rent/Rent";
import RentRepository from "../repositories/RentRepository";
import redisTests from './redisTests';



const createReadAndDeleteProductTests = async () =>{
    let product1 = new Music("8573947xi39", 10, "Rock Album #1", "Rock");
    let product2 = new Movie("ijuhyg889hu", 74, "Matrix", "Sci-Fi");
    let product3 = new VideoGame("7uio87uio9", 60, "Tomb Raider", "Adventure", DifficultyLevel['Easy']);
    let product4 = new BoardGame("kocisau8yf", 105, "Talisman", "Adventure", DifficultyLevel['Hard']);
    
    const productRepo = new ProductRepository();
    
    await productRepo.add(product1);
    await productRepo.add(product2);
    await productRepo.add(product3);
    await productRepo.add(product4);
    
    let prodduct1_db = await productRepo.findById(product1.id)
    let prodduct2_db = await productRepo.findById(product2.id)
    let prodduct3_db = await productRepo.findById(product3.id)
    let prodduct4_db = await productRepo.findById(product4.id)

    assert(JSON.stringify(prodduct1_db) === JSON.stringify(product1), 'product creation and readability tested fine')
    assert(JSON.stringify(prodduct2_db) === JSON.stringify(product2), 'product creation and readability tested fine')
    assert(JSON.stringify(prodduct3_db) === JSON.stringify(product3), 'product creation and readability tested fine')
    assert(JSON.stringify(prodduct4_db) === JSON.stringify(product4), 'product creation and readability tested fine')
    
    
    await productRepo.remove(product1);
    await productRepo.remove(product2);
    await productRepo.remove(product3);
    await productRepo.remove(product4);

    prodduct1_db = await productRepo.findById(product1.id)
    prodduct2_db = await productRepo.findById(product2.id)
    prodduct3_db = await productRepo.findById(product3.id)
    prodduct4_db = await productRepo.findById(product4.id)

    assert(prodduct1_db === null)
    assert(prodduct2_db === null)
    assert(prodduct3_db === null)
    assert(prodduct4_db === null)
    
    
    console.log("succes");
}

const findProductBySerialNumberTest = async () =>{
    let product = new Music("8573947xi393", 11, "Rock Album #12", "Rocky");
    
    const productRepo = new ProductRepository();
    
    await productRepo.add(product);
    
    const prodduct_db = await productRepo.findBySerialNumber(product.serialNumber)

    assert(JSON.stringify(prodduct_db) === JSON.stringify(product))


    console.log("succes");

    await productRepo.remove(product)
}



const CRUDCustomerTest = async () =>{
    let address = new Address('Gdzieś', '12', 'tam')
    let customer = new Customer('Jan', 'Kowalski', '76546789', address)

    const customerRepo = new CustomerRepository();

    await customerRepo.add(customer);

    const customer_db1 = await customerRepo.findById(customer.id);
    const customer_db2 = await customerRepo.findByPersonalID(customer.pid)
    const customer_db3 = await customerRepo.findBy((c) => c.name === customer.name)
    await customerRepo.remove(customer);
    const customer_db4 = await customerRepo.findById(customer.id);
    
    
    assert(JSON.stringify(customer_db1) === JSON.stringify(customer), 'customer creation and readability fine 1')
    assert(JSON.stringify(customer_db2) === JSON.stringify(customer), 'customer creation and readability fine 2')
    assert(JSON.stringify(customer_db3) === JSON.stringify(customer), 'customer creation and readability  fine 3')
    assert(customer_db4 === null, 'customer creation and readability tested 4')
    
    console.log("succes");
}


const CRUDRentTest = async () =>{
    const product = new Music("8573947xi3933", 111, "Rock Album #123", "Rocky!!!");
    const address = new Address('Gdzieś', '12', 'tam')
    const customer = new Customer('Jan', 'Kowalski', '76546789', address)

    const rent = new Rent(customer, product);

    const productRepo = new ProductRepository();
    const customerRepo = new CustomerRepository();
    const rentRepo = new RentRepository();

    await productRepo.add(product);
    await customerRepo.add(customer);
    
    await rentRepo.add(rent);

    const rent_db = await rentRepo.findById(rent.id);

    

    // assert(JSON.stringify(rent_db) === JSON.stringify(rent), 'rent creation and readability fine 1')

    console.log("succes");

    await rentRepo.remove(rent);
    await customerRepo.remove(customer);
    await productRepo.remove(product);



}




const doAllTests = async ()=> {
    // await createReadAndDeleteProductTests();
    // await findProductBySerialNumberTest();
    // await CRUDCustomerTest();
    // await CRUDRentTest();
    await redisTests();

    exit()
}

doAllTests();

