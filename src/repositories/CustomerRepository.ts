import Address from "../customer/Address";
import Customer from "../customer/Customer";
import Bronze from "../customer/CustomerType/Bronze";
import Default from "../customer/CustomerType/Default";
import Gold from "../customer/CustomerType/Gold";
import Silver from "../customer/CustomerType/Silver";
import { IRepository } from "./Repository.type";
import CustomerType from "../customer/CustomerType/CustomerType";
import mongoose, { Model, Models, Schema } from "mongoose";
import { config } from "../config/config";
import { number } from "joi";

type CustomerTypeString = 'Gold' | 'Silver' | 'Bronze' | 'Default' ;

const CustomerTypesMap = {
    'Gold': Gold,
    'Silver': Silver,
    'Bronze': Bronze,
    'Default': Default
}




interface ICustomer {
    name: string,
    surname: string,
    pid: string,
    address: {
        city: string,
        number: string,
        street: string
    },
    customerType: CustomerTypeString
}


const customerSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    pid: {type: String, required: true},
    address: {
        city: {type: String, required: true},
        number: {type: String, required: true},
        street: {type: String, required: true}
    },
    customerType: {type: String, required: true, enum: ['Gold' , 'Silver' , 'Bronze' , 'Default' ]}
},
{
    versionKey: false
}
)

type makeCustomerProps = {
    _id: mongoose.Types.ObjectId,
    name: string,
    surname: string,
    pid: string,
    address: {
        city: string,
        number: string,
        street: string
    },
    customerType: CustomerTypeString
}

class CustomerRepository {

    static customersCollection: mongoose.Model<ICustomer> = mongoose.model<ICustomer>('Customer', customerSchema);
    constructor(){
        mongoose.connect(config.mongo.url);

        
    }


    static makeCustomer(results: makeCustomerProps): Customer{
        const customerAddress = new Address(results.address.city, results.address.number, results.address.street)
        const customer = new Customer(results.name, results.surname, results.pid, customerAddress);
        const type: CustomerTypeString = results.customerType;
        customer.CustomerType = new CustomerTypesMap[type ? type : 'Default']();
        customer.id = results._id.toString();
        return customer;
    
    }

     async get(index: number): Promise<Customer | null> {
        const results = await CustomerRepository.customersCollection.find();
        if (!results || results.length < 1 || results.length <= index) {
            return null;
        }
        let x = results[index]
        return CustomerRepository.makeCustomer(x);
    }

     async add(item: Customer): Promise<void> {
        const { ...props }: any = item;

        // props.className = item.constructor.name;
        console.log(props);
        console.log(props._CustomerType);

        let newProps = {
            name: props._name,
            surname: props._surname,
            pid: props._pid,
            address: {
                city: props._address?._city,
                number: props._address?._number,
                street: props._address?._street
            },
            customerType: props._CustomerType?.constructor.name
        }

        // props._id = item.id;
        const toAdd = new CustomerRepository.customersCollection(newProps);

        await toAdd.save();

    }

     async remove(item: Customer): Promise<void> {
        CustomerRepository.customersCollection.findByIdAndDelete(item.id);
    }

     async size(): Promise<number> {
        return await CustomerRepository.customersCollection.countDocuments();
     }

      async getAll(): Promise<Customer[]> {
        const results = await CustomerRepository.customersCollection.find();
        let mapped = results.map(item => { return CustomerRepository.makeCustomer(item)})
        return  mapped.filter((item): item is Customer => item != null);
    }

     async findBy(filterFunction: (item: Customer) => boolean) {
        let allCustomers = await this.getAll();
        return allCustomers.filter(filterFunction)[0];
    }

     async findByPersonalID(personalID: string) {
        return this.findBy((item)=>personalID === item.pid)
    }


    async findById(id: string) {
        return this.findBy((item)=>id === item.id)
    }

    async setCustomerType(c: Customer, t: CustomerType) {
        const toUpdate = await CustomerRepository.customersCollection.findById(c.id);
        if(!toUpdate) {console.error('No such customer in database'); return}
        toUpdate.customerType = t.constructor.name as CustomerTypeString;
        toUpdate.save();
    }

}

export default CustomerRepository;