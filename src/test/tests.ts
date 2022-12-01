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


const createAndReadProductTests = async () =>{
    let product1 = new Music("8573947xi39", 10, "Rock Album #1", "Rock");
    let product2 = new Movie("ijuhyg889hu", 74, "Matrix", "Sci-Fi");
    let product3 = new VideoGame("7uio87uio9", 60, "Tomb Raider", "Adventure", DifficultyLevel['Easy']);
    let product4 = new BoardGame("kocisau8yf", 105, "Talisman", "Adventure", DifficultyLevel['Hard']);
    
    const productRepo = new ProductRepository();
    
    await productRepo.add(product1);
    await productRepo.add(product2);
    await productRepo.add(product3);
    await productRepo.add(product4);
    
    const prodduct1_db = await productRepo.findById(product1.id)
    const prodduct2_db = await productRepo.findById(product2.id)
    const prodduct3_db = await productRepo.findById(product3.id)
    const prodduct4_db = await productRepo.findById(product4.id)

    assert(JSON.stringify(prodduct1_db) === JSON.stringify(product1), 'product creation and readability tested fine')
    assert(JSON.stringify(prodduct2_db) === JSON.stringify(product2), 'product creation and readability tested fine')
    assert(JSON.stringify(prodduct3_db) === JSON.stringify(product3), 'product creation and readability tested fine')
    assert(JSON.stringify(prodduct4_db) === JSON.stringify(product4), 'product creation and readability tested fine')
    console.log("succes");
}

const findProductBySerialNumberTest = async () =>{
    let product1 = new Music("8573947xi39", 10, "Rock Album #1", "Rock");
    
    const productRepo = new ProductRepository();
    
    await productRepo.add(product1);
    
    const prodduct1_db = await productRepo.findBySerialNumber(product1.serialNumber)

    assert(JSON.stringify(prodduct1_db) === JSON.stringify(product1), 'product creation and readability tested fine')
    console.log("succes");
}



const createAndReadCustomerTests = async () =>{
    let address = new Address('Gdzieś', '12', 'tam')
    let customer = new Customer('Jan', 'Kowalski', '76546789', address)

    const customerRepo = new CustomerRepository();

    customerRepo.add(customer);

    const customer_db = customerRepo.findById(customer.id);

    assert(JSON.stringify(customer_db) === JSON.stringify(customer), 'product creation and readability tested fine')
    console.log("succes");

}




createAndReadProductTests()
findProductBySerialNumberTest()
createAndReadCustomerTests()
