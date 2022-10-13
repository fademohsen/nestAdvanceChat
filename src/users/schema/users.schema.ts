// import * as mongoose from 'mongoose';

// export const UsersSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String,
// });
//
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from "../../enums/role.enum";

@Schema()
@ObjectType()
export class Users {

  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'user name' })
  name: string;

  @Prop()
  @Field(() => String, { description: 'user email' })
  email: string;

  @Prop()
  @Field(() => String, { description: 'user password' })
  password: string;

  @Prop()
  @Field(() => String, { description: 'user mobileNumber' })
  mobileNumber: string;

  @Prop()
  @Field(() => String, { description: 'User role' })
  role:string;
}

export const UserSchema = SchemaFactory.createForClass(Users);
