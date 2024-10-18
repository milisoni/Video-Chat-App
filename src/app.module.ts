import { Module } from '@nestjs/common';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import {TypeOrmModule} from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { ChatModule } from './chat/chat.module';
import { ChatRoom } from './chat/chatroom.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot(
      {
        rootPath: 'C:/Users/milis/video-chat-app/public',
        serveRoot: '/', // This makes your files accessible at the root path
      },
    ),
    TypeOrmModule.forRoot({
      type: 'sqlite', // You can replace with another database type (e.g., MySQL, PostgreSQL)
      database: 'database.sqlite',
      entities: [User, ChatRoom],
      synchronize: true, // Don't use this in production as it auto-syncs the schema
    }),    
    AuthModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
