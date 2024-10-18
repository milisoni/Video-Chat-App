import { Module } from '@nestjs/common';
import { ChatRoomService } from './chat-room/chat-room.service';
import { ChatRoomController } from './chat-room/chat-room.controller';
import { ChatRoom } from './chatroom.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom])],
  providers: [ChatRoomService, ChatGateway],
  controllers: [ChatRoomController]
})
export class ChatModule {}
