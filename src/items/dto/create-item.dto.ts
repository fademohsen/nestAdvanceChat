import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly description: string;
    @ApiProperty()
    readonly qty: number; 
    @ApiProperty()
    readonly unit: string;  
}