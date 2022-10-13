import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UnitController } from './unit.controller';
import { UnitService } from './unit.service';
import { UnitSchema } from './schema/unit.schema';
import { RolesGuard } from '../auth/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Unit', schema: UnitSchema }])],
    controllers: [UnitController],
    providers: [UnitService, {
        provide: APP_GUARD,
        useClass: RolesGuard,
      }]
})
export class UnitModule {

}
