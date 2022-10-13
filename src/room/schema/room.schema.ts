
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Room {

  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'user name' })
  peer1: string;

  @Prop()
  @Field(() => String, { description: 'user email' })
  peer2: string;

}

export const RoomSchema = SchemaFactory.createForClass(Room);
