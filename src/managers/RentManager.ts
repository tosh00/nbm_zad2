import Customer from "../customer/Customer";
import Product from "../product/Product";
import Rent from "../rent/Rent";
import RentRepository from "../repositories/RentRepository";

class RentManager{

    repo: RentRepository = new RentRepository();

    async rentProduct(customer: Customer, product: Product, beginTime: Date){
        const allRents = await this.repo.getAll()
        this.repo.add(new Rent(customer, product, beginTime))
    }
    returnProduct(rent: Rent){
        rent.endTime = new Date();
        this.repo.setEndRent(rent);
    }
    async getAllCustomersRents(c: Customer){
        return await this.repo.findBy((rent)=>rent.customer.pid === c.pid)
    }

    async findRents(filterFunction: (item: Rent) => boolean){
        return await this.repo.findBy(filterFunction)
    }

    async findAllRents(){
        return await this.repo.getAll()
    }

    async checkCustomerRentBalance(c: Customer): Promise<number>{
        const all = await this.getAllCustomersRents(c);
        let sum = 0;
        all.forEach((rent)=>{
            if(rent.endTime){
                sum += rent.rentCost * rent.rentDays;
            }
        })
        return sum;
    }
}

export default RentManager;
