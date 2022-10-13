import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
export const ItemsSchema = new mongoose.Schema({
    name: String,
    description: String,
    qty: Number,
    unit: {type: mongoose.Schema.Types.ObjectId, ref: 'Unit'},

});
//
ItemsSchema.pre('save', function(next) {
    console.log('pre save');
    next();
}
);