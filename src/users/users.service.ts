import { Injectable , ClassSerializerInterceptor , UseInterceptors  } from '@nestjs/common';
import { Users } from './interfaces/users.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class UsersService {

    constructor(@InjectModel('Users') private readonly usersModel: Model<Users>) {}
    @UseInterceptors(ClassSerializerInterceptor)
    async findAll(): Promise<Users[]> {
        return await this.usersModel.find();
        
    }

    @UseInterceptors(ClassSerializerInterceptor)
    async findOne(email: string): Promise<Users> {
        return await this.usersModel.findOne({ email: email });
    }

    async create(users: Users): Promise<Users> {
        let newUsers = new this.usersModel(users);
        newUsers.role = "user";
        return await newUsers.save();
               
    }
    async delete(id:string) : Promise<Users> {
        return await this.usersModel.findByIdAndRemove(id);
    }
    async update(id: string, users: Users): Promise<Users> {
        return await this.usersModel.findByIdAndUpdate(id, users, { new: true });
    }
        
}
