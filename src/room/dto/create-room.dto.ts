import { ApiProperty } from '@nestjs/swagger';

export class CreateUnitDto {
    @ApiProperty()
    readonly peer1: string; 
    @ApiProperty()
    readonly peer2: string;
}