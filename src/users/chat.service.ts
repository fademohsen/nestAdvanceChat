import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Socket } from 'socket.io';
import { parse } from 'cookie';
import { WsException } from '@nestjs/websockets';
 
@Injectable()
export class ChatService {
  constructor(
    private readonly authenticationService: AuthService,
  ) {
  }
 
  async getUserFromSocket(socket: Socket) {
    let token = socket.handshake.query.token;
    const user = await this.authenticationService.getUserFromAuthenticationToken(token.toString());
    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    return user;
  }
}