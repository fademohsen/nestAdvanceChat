import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomSchema } from './schema/room.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomService } from './room.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }])],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService]
})
export class RoomModule {}
