import { Injectable } from '@nestjs/common';
import { Room } from './interfaces/room.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RoomService {
    constructor(@InjectModel('Room') private readonly roomModel: Model<Room>) {}
    
    async create(room: Room): Promise<Room> {
        const createdRoom = new this.roomModel(room);
        return createdRoom.save();
    }
    
    async findAll(): Promise<Room[]> {
        return this.roomModel.find().exec();
    }
    
    async findOne(id: string): Promise<Room> {
        return this.roomModel.findOne({ _id: id });
    }
    
    async delete(id: string): Promise<Room> {
        return this.roomModel.findByIdAndRemove(id);
    }

}
