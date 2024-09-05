import { Body, Controller, Post } from '@nestjs/common';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';

@Controller('passenger')
export class PassengerController {
    constructor(private readonly passengersService:PassengerService){}
    @Post()
    create(@Body() passenger:PassengerDTO){
        return this.passengersService.create(passenger)
    }
}
