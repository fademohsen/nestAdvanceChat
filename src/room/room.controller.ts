import { Controller, Get, Post, Put, Delete, Body ,Req , Res , Param , UsePipes } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-room.dto'
import { RoomService } from './room.service';
import { Room } from './interfaces/room.interface';
import { JoiValidationPipe } from '../joi-validation.pipe';
import { createRoomSchema } from './dto/create-room.schema';
import { Roles } from "../auth/decorator/roles.decorator";
import {Role} from '../enums/role.enum';

@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Get()
    async findAll(): Promise<Room[]> {
        return this.roomService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id): Promise<Room> {
        return this.roomService.findOne(id);
    }

    @Post()
    @UsePipes(new JoiValidationPipe(createRoomSchema))
    async create(@Body() createRoomDto: CreateUnitDto) {
        this.roomService.create(createRoomDto);
    }

    @Delete(':id')
    async delete(@Param('id') id) {
        this.roomService.delete(id);
    }
}
