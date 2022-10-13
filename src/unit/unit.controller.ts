import { Controller, Get, Post, Put, Delete, Body ,Req , Res , Param , UsePipes } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto'
import { UnitService } from './unit.service';
import { Unit } from './interfaces/unit.interface';
import { JoiValidationPipe } from '../joi-validation.pipe';
import { createUnitSchema } from './dto/create-unit.schema';
import { Roles } from "../auth/decorator/roles.decorator";
import {Role} from '../enums/role.enum';

@Controller('unit')
export class UnitController {
    constructor(private readonly unitService: UnitService) {}


    @Roles(Role.Admin)
    @Get()
    async findAll(): Promise<Unit[]> {
        return this.unitService.findAll();
    }

    @Roles(Role.Admin)
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Unit[]> {
        return this.unitService.findOne(id);
    }

    @Roles(Role.Admin)
    @Post()
    @UsePipes(new JoiValidationPipe(createUnitSchema))
    async create(@Body() CreateUnitDto: CreateUnitDto) {
        return this.unitService.create(CreateUnitDto);
    }

    @Roles(Role.Admin)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.unitService.delete(id);
    }

    @Roles(Role.Admin)
    @Put(':id')
    async update(@Body() updateUnitDto: CreateUnitDto, @Param('id') id: string) {   
        return this.unitService.update(id, updateUnitDto);
    }

}
