import { Component, OnInit } from '@angular/core';
import { ChatRoomService } from '../../services/chat-room.service';
import { consumerMarkDirty } from '@angular/core/primitives/signals';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [ChatRoomService, AuthService],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss'
})
export class ChatRoomComponent implements OnInit{
  chatRooms: any[] = [];
  newRoomName:string = '';
  userId:number = this.authService.getUserId();
  isLoggedIn:boolean = false;


  constructor(private chatRoomService: ChatRoomService, private authService:AuthService, private router:Router) {}

  ngOnInit() {

    this.isLoggedIn = !!this.authService.getToken();

    if(!this.isLoggedIn){
      this.router.navigate(['/login']);
      return;
    }
  
    
    this.loadChatRooms();
    

    this.chatRoomService.onUserJoined().subscribe(data => {
      console.log('User joined:', data);
    });
  }

  loadChatRooms(){
    this.chatRoomService.getChatRooms().subscribe(rooms => {
      this.chatRooms = rooms;
    });
  }

  createRoom() {
    this.chatRoomService.createChatRoom({ name: this.newRoomName })
      .subscribe(room => this.chatRooms.push(room));  // Add the new room to the list
  }

  joinRoom(roomId: string) {
    this.chatRoomService.joinRoom(roomId);  // Join a room using WebSocket
  }

  leaveRoom(): void {
    // Logic for leaving a room
    console.log('Left the room');
}

  logout() : void{
    this.authService.logout();

    this.router.navigate(['/login']);
    
  }
}
