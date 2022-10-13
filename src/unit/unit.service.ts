import { Injectable } from '@nestjs/common';
import { Unit } from './interfaces/unit.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class UnitService {
    constructor(@InjectModel('Unit') private readonly unitModel: Model<Unit>) {}
    async findAll(): Promise<Unit[]> {
        return await this.unitModel.find();
        
    }
    async findOne(id: string): Promise<Unit[]> {
        return await this.unitModel.findOne({ _id: id });
    }
    async create(unit: Unit): Promise<Unit> {
        const newUnit = new this.unitModel(unit);
        return await newUnit.save();
               
    }
    async delete(id:string) : Promise<Unit> {
        return await this.unitModel.findByIdAndRemove(id);
    }
    async update(id: string, unit: Unit): Promise<Unit> {
        return await this.unitModel.findByIdAndUpdate(id, unit, { new: true });
    }
        
}
