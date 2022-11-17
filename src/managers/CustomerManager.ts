
import Address from "../customer/Address";
import Customer from "../customer/Customer";
import CustomerType from "../customer/CustomerType/CustomerType";
import CustomerRepository from "../repositories/CustomerRepository";

class CustomerManager{
    repo: CustomerRepository = new CustomerRepository();

    registerCustomer(firstName: string, lastName: string, PID: string, clientType: CustomerType, address: Address){
        this.repo.add(new Customer(firstName, lastName, PID, address))
    }
    unregisterCustomer(customer: Customer){
        this.repo.remove(customer);
    }
    getCustomer(PID: string){
        this.repo.findByPersonalID(PID);
    }
    findCustomer(filterFunction: (item: Customer) => boolean){
        this.repo.findBy(filterFunction);
    }
    findAllCustomers(){
        this.repo.getAll();
    }
    changeCustomerType(c: Customer, t: CustomerType){
        this.repo.setCustomerType(c, t);
    }
}

export default CustomerManager