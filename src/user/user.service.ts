import { Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { IUser } from 'src/common/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { Model } from 'mongoose';
@Injectable()
export class UserService {
    constructor(@InjectModel(USER.name) private readonly model:Model<IUser>){}
    async hashPassword(password:string):Promise<string>{
        try {
            const salt = await bcrypt.genSalt(10)
            return  await bcrypt.hash(password,salt)
        } catch (error) {
            console.log(error);
        }
    }
   async create(user:UserDTO):Promise<IUser>{
    try {
        const hash=await this.hashPassword(user.password)
        const newUser=new this.model({...user,password:hash})
        return await newUser.save();
    } catch (error) {
        console.log(error);
        
    }
    }

   async getAllUsers():Promise<IUser[]>{
    return await this.model.find()
   }

   async getById(id:string):Promise<IUser>{
    return await this.model.findById(id)
   }

   async updateUser(id:string, user:UserDTO):Promise<IUser>{
    const hash = await this.hashPassword(user.password)
    const newUser={...user,password:hash}

    return this.model.findByIdAndUpdate(id,newUser,{new:true})
   }
}
