import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageSchema } from './schema/message.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageService } from './message.service';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }])],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService]
})
export class MessageModule {}
