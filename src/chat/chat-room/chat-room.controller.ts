import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChatRoomService } from './chat-room.service';
import { ChatRoom } from '../chatroom.entity';

@Controller('chatrooms')
export class ChatRoomController {
    constructor(private readonly chatRoomService: ChatRoomService) {}

  @Post()
  @UseGuards(AuthGuard('jwt')) // Protect this endpoint with JWT authentication
  async create(@Body() body: { name: string; userId: number }, @Req() req: Request) : Promise<ChatRoom> {
    
    return this.chatRoomService.createChatRoom(body.name, body.userId);
  }

  @Get()
  async findAll() {
    return this.chatRoomService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.chatRoomService.findOne(id);
  }
}
