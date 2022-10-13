import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
 } from '@nestjs/websockets';
 import { Socket, Server } from 'socket.io';
 import { AppService } from './app.service';
//  import { Chat } from './chat.entity';
import { ChatService } from './users/chat.service';
import { RoomService } from './room/room.service';
import { MessageService } from './message/message.service';

@WebSocketGateway({
 cors: {
   origin: '*',
 },
})

export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
 constructor(private appService: AppService ,
   private readonly chatService: ChatService,
   private readonly roomService: RoomService,
   private readonly messageService: MessageService,

   ) {}

 @WebSocketServer() server: Server;
 
  //auth socet connection
  @SubscribeMessage('auth')
  async handleAuth(client: Socket, payload: any): Promise<void> {
    const user = await this.chatService.getUserFromSocket(client);
    client.emit('auth', user);
  }

 afterInit(server: Server) {
   console.log(server);
   //Do stuffs
 }
 
 handleDisconnect(client: Socket) {
   console.log(`Disconnected: ${client.id}`);
   //Do stuffs
 }
 
 async handleConnection(client: Socket, ...args: any[]) {
  const user = await this.chatService.getUserFromSocket(client);
    client.data = {
      _id:user.id,
      name:user.name,
      email:user.email,
      role:user.role,
    }
    client.emit('auth', user);
   console.log(`Connected ${client.id}`);
   //Do stuffs
 }
 @SubscribeMessage('createRoomAndJoin')
  async handleCreateRoomAndJoin(client: Socket, payload: any): Promise<void> {
    payload.peer1 = client.data._id;
    const room = await this.roomService.create(payload);
    client.join(room.id);
    client.emit('createRoomAndJoin', room);
  }

 @SubscribeMessage('JoinRoom')
  async handleJoinRoom(client: Socket, payload: any): Promise<void> {
    client.join(payload.room);
    client.emit('JoinRoom', payload.room);
  }
  @SubscribeMessage('LeaveRoom')
  async handleLeaveRoom(client: Socket, payload: any): Promise<void> {
    client.leave(payload.room);
    client.emit('LeaveRoom', payload.room);
  }
  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: any): Promise<void> {
    payload.peer1 = client.data._id;
    const message = await this.messageService.create(payload);
    this.server.to(payload.room).emit('sendMessage', message);
  }



}
