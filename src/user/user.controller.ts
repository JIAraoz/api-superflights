import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';


@Controller('api/v1/user')
export class UserController {
    constructor(private readonly userService:UserService){}
    @Post()
    create(@Body() user:UserDTO  ){
        return this.userService.create(user)
    }
    @Get()
    getAllUsers(){
        return this.userService.getAllUsers()
    }
    @Get(":id")
    getById(@Param('id') id:string){
        return this.userService.getById(id)
    }
    @Put(":id")
    updateUser(@Param('id') id:string, @Body() user:UserDTO){
        return this.userService.updateUser(id,user)
    }
    @Delete(":id")
    deleteUser(@Param('id') id:string){
        return this.userService.deleteUser(id)
    }
}
