import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoom } from '../chatroom.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatRoomService {
    constructor(
        @InjectRepository(ChatRoom)
        private chatRoomRepository: Repository<ChatRoom>,
      ) {}
    
      async createChatRoom(name: string, userId: number): Promise<ChatRoom> {
        const chatRoom = this.chatRoomRepository.create({ name, userId });
        return this.chatRoomRepository.save(chatRoom);
      }
    
      async findAll(): Promise<ChatRoom[]> {
        return this.chatRoomRepository.find();
      }
    
      async findOne(id: number): Promise<ChatRoom> {
        return this.chatRoomRepository.findOneBy({ id });
      }
}
