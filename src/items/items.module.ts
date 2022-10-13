import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { ItemsSchema } from './schema/items.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';

import { APP_GUARD } from '@nestjs/core';


@Module({
    imports: [MongooseModule.forFeature([{ name: 'Item', schema: ItemsSchema }])],
    controllers: [ItemsController],
    providers: [ItemsService , {
        provide: APP_GUARD,
        useClass: RolesGuard,
      }, CaslAbilityFactory],
})
export class ItemsModule {

}
