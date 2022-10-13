import { Controller, Get, Post, Put, Delete, Body ,Req , Res , Param , UsePipes } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto'
import { UsersService } from './users.service';
import { Users } from './interfaces/users.interface';
import { JoiValidationPipe } from '../joi-validation.pipe';
import { createUsersSchema } from './dto/create-users.schema';
import { Public } from "../auth/decorator/public.decorator";

@Controller('users')
export class UsersController { 
    constructor(private readonly usersService: UsersService) {}
    @Get()
    async findAll(): Promise<Users[]> {
        return this.usersService.findAll();
    }
    @Get(':id')
    async findOne( @Param('id') id: string): Promise<Users> {
        return this.usersService.findOne(id);
    }

    @Public()
    @Post()
    @UsePipes(new JoiValidationPipe(createUsersSchema))
    async create(@Body() CreateUsersDto: CreateUsersDto) {
        
        return this.usersService.create(CreateUsersDto);
    }
    @Delete(':id')
    async delete(@Param('id') id: string) {
        this.usersService.delete(id);
    }
    @Put(':id')
    async update(@Body() updateUsersDto: CreateUsersDto, @Param('id') id: string) {   
        this.usersService.update(id, updateUsersDto);
    }
}
