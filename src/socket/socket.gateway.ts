import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayInit,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';
import { CreateSocketDto } from './dto/create-socket.dto';
import { UpdateSocketDto } from './dto/update-socket.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  constructor(private readonly socketService: SocketService) {}
  afterInit(server: Server) {
    console.log('Websocket server started');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('new connection!', client.id);
  }
  handleDisconnect(client: any) {
    console.log('client disconnected!', client.id);
  }

  @SubscribeMessage('send_message')
  listenForMessages(@MessageBody() data: string) {
    this.server.emit('message', data);
  }

  @SubscribeMessage('createSocket')
  create(@MessageBody() createSocketDto: CreateSocketDto) {
    return this.socketService.create(createSocketDto);
  }

  @SubscribeMessage('findAllSocket')
  findAll() {
    return this.socketService.findAll();
  }

  @SubscribeMessage('findOneSocket')
  findOne(@MessageBody() id: number) {
    return this.socketService.findOne(id);
  }

  @SubscribeMessage('updateSocket')
  update(@MessageBody() updateSocketDto: UpdateSocketDto) {
    return this.socketService.update(updateSocketDto.id, updateSocketDto);
  }

  @SubscribeMessage('removeSocket')
  remove(@MessageBody() id: number) {
    return this.socketService.remove(id);
  }
}
