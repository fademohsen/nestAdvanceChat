
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Message {

  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  room:{ type: MongooseSchema.Types.ObjectId, ref: 'Room' }
  
  @Prop()
  @Field(() => String, { description: 'user name' })
  peer1: string;

  @Prop()
  @Field(() => String, { description: 'user email' })
  peer2: string;

  @Prop()
  @Field(() => String, { description: 'user content' })
  content: string;


}

export const MessageSchema = SchemaFactory.createForClass(Message);
