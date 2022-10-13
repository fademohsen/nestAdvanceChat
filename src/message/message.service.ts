import { Injectable } from '@nestjs/common';
import { Message } from './interfaces/message.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MessageService {
    constructor(@InjectModel('Message') private readonly messageModel: Model<Message>) {}

    async create(message: Message): Promise<Message> {
        const createdMessage = new this.messageModel(message);
        return createdMessage.save();
    }

    async findAll(): Promise<Message[]> {
        return this.messageModel.find().exec();
    }

    async findOne(id: string): Promise<Message> {
        return this.messageModel.findOne({ _id: id });
    }

    async delete(id: string): Promise<Message> {
        return this.messageModel.findByIdAndRemove(id);
    }
}
