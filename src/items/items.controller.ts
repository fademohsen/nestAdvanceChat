import { Controller, Get, Post, Put, Delete, Body ,Request , Res , Param , UsePipes , UseGuards , SetMetadata } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto'
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';
import { JoiValidationPipe } from '../joi-validation.pipe';
import { createItemSchema } from './dto/create-item.schema';
import { Roles } from "../auth/decorator/roles.decorator";
import {Role} from '../enums/role.enum';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { Action } from '../enums/permisions.enum';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService , private caslAbilityFactory: CaslAbilityFactory) {}

    @Roles(Role.Admin)
    @Get()
    async findAll(): Promise<Item[]> {
        return this.itemsService.findAll();
    } 

    @Roles(Role.Admin)
    @Get(':id')
    async findOne(@Param('id') id): Promise<Item[]> {
        return this.itemsService.findOne(id);
    }
    // @Public()
    @Roles(Role.Admin , Role.User)
    @Post() 
    @UsePipes (new JoiValidationPipe(createItemSchema))
    create(@Request() req ,@Body( new JoiValidationPipe(createItemSchema) ) CreateItemDto: CreateItemDto): Promise<Item> {
        const ability = this.caslAbilityFactory.createForUser(req.user.user);
        if (ability.can(Action.Create, Item)) {
            return this.itemsService.create(CreateItemDto);
        }
    }

    @Roles(Role.Admin)
    @Put(':id')
    update(@Body() CreateItemDto: CreateItemDto , @Param('id') id): Promise<Item> {
        return this.itemsService.update(id , CreateItemDto);
    }
    
    @Roles(Role.Admin)
    @Delete(':id')
    delete(@Param('id') id): Promise<Item> {
        return this.itemsService.delete(id);
    }


}
