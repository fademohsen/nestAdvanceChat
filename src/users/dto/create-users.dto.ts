import { ApiProperty } from '@nestjs/swagger';
import { InputType, Int, Field } from '@nestjs/graphql';
import { Role } from "../../enums/role.enum";


@InputType()
export class CreateUsersDto {
    @ApiProperty()
    @Field(() => String, { description: 'name' })
    readonly name: string;

    @Field(() => String, { description: 'email' })
    @ApiProperty()
    readonly email: string;

    @Field(() => String, { description: 'password' })
    @ApiProperty()
    readonly password: string;

    @Field(() => String, { description: 'mobileNumber' })
    @ApiProperty()
    readonly mobileNumber: string;

    
}