import { Injectable } from '@nestjs/common';
import { PassengerDTO } from './dto/passenger.dto';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { InjectModel } from '@nestjs/mongoose';
import { PASSENGER } from 'src/common/models/passenger';
import { Model } from 'mongoose';

@Injectable()
export class PassengerService {
    constructor(@InjectModel(PASSENGER.name) private readonly model:Model<IPassenger>){}
   async create(passenger:PassengerDTO):Promise<IPassenger>{
        const newPassenger= new this.model(passenger)
        return await newPassenger.save()
    }
}
