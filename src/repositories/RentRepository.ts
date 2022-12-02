import Rent from "../rent/Rent";
import { IRepository } from "./Repository.type";
import CustomerRepository from "./CustomerRepository";
import Customer from "../customer/Customer";
import Product from "../product/Product";
import mongoose, { ClientSession, Schema } from "mongoose";
import { config } from "../config/config";
import ProductRepository from "./ProductRepository";
import { assert } from "node:console";





type makeRentProps = {
  customer: string,
  product: string,
  beginTime: Date,
  _id: mongoose.Types.ObjectId
}

interface IProduct {
    className: string,
    basePrice: number,
    title: string,
    category: string,
    serialNumber: string,
    difficultyLevel: string | undefined
}


const productSchema = new Schema<IProduct>({
    className: { type: String, required: true, enum: ['BoardGame', 'VideoGame', 'Movie', 'Music'] },
    basePrice: { type: Number, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    serialNumber: { type: String, required: true },
    difficultyLevel: { type: String, required: false, enum: ['Easy', 'Medium', 'Hard', 'VeryHard'] }
},
{
    versionKey: false
}
)

interface IRent {
  customer: string,
  product: string,
  beginTime: Date,
  endTime?: Date
}


const rentSchema = new Schema({
  customer: {type: Schema.Types.ObjectId, required: true, ref: 'Customer'},
  product: {type: Schema.Types.ObjectId, required: true, ref: 'Product'},
  beginTime: {type: Date, required: true},
  endTime: {type: Date, required: false}
}, 
{
  versionKey: false
})


class RentRepository {
  static rentCollection: mongoose.Model<IRent> = mongoose.model<IRent>('Rent', rentSchema);


  constructor(){
    mongoose.connect(config.mongo.url);
  }


  static async makeRent(r: makeRentProps){
    
    const productRepo: ProductRepository = new ProductRepository();
    const customerRepo: CustomerRepository = new CustomerRepository();

    const c = await customerRepo.findById(r.customer.toString());
    const p = await productRepo.findById(r.product.toString());

    // console.log(c, p);

    if(!p || !c){
      console.error('produkt lub klient nie są w repozytorium')
      return
    }
    const rent =  new Rent(c, p, r.beginTime)
    rent.id = r._id.toString();
    return rent
  }

  async get(index: number){
    


    // const results = await RentRepository.rentCollection.find().populate({path: 'customer', populate: {path: 'address'}}).populate('product')
    const results = await RentRepository.rentCollection.find()
    if(results?.length  <= index) return null;
    
    const r = results[index]

    return RentRepository.makeRent(r);
}
  
  async add(rent: Rent) {
    const props = {
      _id: rent.id,
      customer: rent.customer?.id,
      product: rent.product?.id,
      beginTime: rent.beginTime,
      endTime: rent.endTime
    }
    
    let toAdd = new RentRepository.rentCollection(props)

    let col = RentRepository.rentCollection;
    let session: ClientSession | null = null;
    await col.createCollection().
    then(()=> col.startSession()).
    then(_sesion => {
      session = _sesion;
      return session.withTransaction(()=>{
        return toAdd.save()
      })
      }).then(()=>
        RentRepository.rentCollection.countDocuments({customer: rent.customer})
      ).then((count)=>assert(count <= (rent.customer.maxProducts ?? 0)))
      .then(()=>session?.endSession())
  }

  async remove(rent: Rent) {
    await RentRepository.rentCollection.findByIdAndDelete(rent.id);
  }
  
  async size(): Promise<number> {
    return await  RentRepository.rentCollection.countDocuments()
  }

  async setEndRent(rent: Rent) {
    const toUpdate = await RentRepository.rentCollection.findById(rent.id);
    if(!toUpdate) {console.error('No such rent in database'); return}
    toUpdate.endTime = rent.endTime;
    toUpdate.save();
  }

  async getAll(): Promise<Rent[]> {
    const res = await RentRepository.rentCollection.find();
    

    const mapped = await Promise.all( res.map(async (item) => {return await RentRepository.makeRent(item)}))
    const filltered =mapped.filter((item): item is Rent => item != null);
    
    return  filltered;
  }

  async findBy(filterFunction: (item: Rent) => boolean): Promise<Rent[]> {
    const all = await this.getAll();
    
    return all.filter(filterFunction)
  }

  async findById(id: string): Promise<Rent> {
    const res = await this.findBy(rent => id === rent.id)
    
    return res[0];
  }
}

export default RentRepository;
