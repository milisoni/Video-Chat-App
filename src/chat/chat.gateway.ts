import {
    WebSocketGateway,
    SubscribeMessage,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    
    @WebSocketServer()
    server: Server;

    private users = {};

    // afterInit(server: any) {
    //     throw new Error('Method not implemented.');
    // }

    afterInit(server: Server) {
      console.log('WebSocket Gateway Initialized');
    }
    
    

    handleConnection(client: any) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: any) {
        console.log(`Client disconnected: ${client.id}`);
        
        for (const room in this.users) {
            this.users[room] = this.users[room].filter((id) => id !== client.id);
          }
    }

    // Handle user joining a chat room
    @SubscribeMessage('joinRoom')
    handleJoinRoom(client: any, payload: { room: string; username: string }) {
        client.join(payload.room);
        this.server.to(payload.room).emit('userJoined', `${payload.username} has joined the room`);
    }

    // Handle user leaving a chat room
    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(client: any, payload: { room: string; username: string }) {
        client.leave(payload.room);
        this.server.to(payload.room).emit('userLeft', `${payload.username} has left the room`);
    }

    

    // @SubscribeMessage('joinRoom')
    // handleJoinRoom(client: any, room: string): void {
    //   client.join(room);
    //   this.server.to(room).emit('message', `${client.id} has joined the room ${room}`);
    // }

    // @SubscribeMessage('leaveRoom')
    // handleLeaveRoom(client: any, room: string): void {
    //   client.leave(room);
    //   this.server.to(room).emit('message', `${client.id} has left the room ${room}`);
    // }
}
