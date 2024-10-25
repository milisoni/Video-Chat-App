import { Component, OnInit } from '@angular/core';
import { ChatRoomService } from '../../services/chat-room.service';
import { consumerMarkDirty } from '@angular/core/primitives/signals';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { VideoCallComponent } from '../video-call/video-call.component';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, VideoCallComponent],
  providers: [ChatRoomService, AuthService],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss'
})
export class ChatRoomComponent implements OnInit {
  chatRooms: any[] = [];
  newRoomName: string = '';
  userId: number = this.authService.getUserId();
  isLoggedIn: boolean = false;
  messages:string[] = [];
  joinedChatRoom:boolean=false;


  constructor(private chatRoomService: ChatRoomService, private authService: AuthService, private router: Router) { }

  ngOnInit() {

    this.isLoggedIn = !!this.authService.getToken();

    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }


    this.loadChatRooms();


    this.chatRoomService.onUserJoined().subscribe((message:string) => {
      this.messages.push(message);
    });
  }

  loadChatRooms() {
    this.chatRoomService.getChatRooms().subscribe(rooms => {
      this.chatRooms = rooms;
    });
  }

  createRoom() {
    this.chatRoomService.createChatRoom({ name: this.newRoomName, userId: this.userId })
      .subscribe(room => this.chatRooms.push(room));  // Add the new room to the list      
    this.router.navigate(['/chat']);
  }

  joinRoom() {
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const room = (document.getElementById('room') as HTMLInputElement).value;
    this.chatRoomService.joinRoom(room, username);  // Join a room using WebSocket
    this.joinedChatRoom=true;
    const messagesDiv = document.getElementById('messages') as HTMLElement;
    messagesDiv.innerHTML += `<h4>Welcome to ${room}.</h4>`;
    messagesDiv.innerHTML += `<p>${username} has joined the room.</p>`;
  }

  leaveRoom(): void {

    const username = (document.getElementById('username') as HTMLInputElement).value;
    const room = (document.getElementById('room') as HTMLInputElement).value;
    this.joinedChatRoom=false;
    this.chatRoomService.leaveRoom(room, username);

    const messagesDiv = document.getElementById('messages') as HTMLElement;
    messagesDiv.innerHTML += `<p>${username} has left the ${room}.</p>`;
    
  }

  logout(): void {
    this.authService.logout();

    this.router.navigate(['/login']);

  }
}
