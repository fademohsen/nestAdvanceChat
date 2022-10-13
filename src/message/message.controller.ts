import { Controller, Get, Post, Put, Delete, Body ,Req , Res , Param , UsePipes } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto'
import { MessageService } from './message.service';
import { Message } from './interfaces/message.interface';
import { JoiValidationPipe } from '../joi-validation.pipe';
import { createMessageSchema } from './dto/create-message.schema';
import { Roles } from "../auth/decorator/roles.decorator";
import {Role} from '../enums/role.enum';
@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}
    @Get()
    async findAll(): Promise<Message[]> {
        return this.messageService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id') id): Promise<Message> {
        return this.messageService.findOne(id);
    }
    @Post()
    @UsePipes(new JoiValidationPipe(createMessageSchema))
    async create(@Body() createMessageDto: CreateMessageDto) {
        this.messageService.create(createMessageDto);
    }
    @Delete(':id')
    async delete(@Param('id') id) {
        this.messageService.delete(id);
    }
}
