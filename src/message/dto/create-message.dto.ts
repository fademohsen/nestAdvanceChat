import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
    @ApiProperty()
    readonly room: string; 
    @ApiProperty()
    readonly peer1: string;
    @ApiProperty()
    readonly peer2: string;
    @ApiProperty()
    readonly content: string;
}