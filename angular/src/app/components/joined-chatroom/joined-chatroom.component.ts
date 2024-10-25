import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ChatRoomService } from '../../services/chat-room.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-joined-chatroom',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [ChatRoomService, AuthService],
  templateUrl: './joined-chatroom.component.html',
  styleUrl: './joined-chatroom.component.scss'
})
export class JoinedChatroomComponent implements OnInit {

  public username!: string;
  public room!: string;

  constructor(private route: ActivatedRoute, private chatRoomService: ChatRoomService) { }

  ngOnInit() {

    // Access the resolved data
    this.route.data.subscribe(data => {
      this.username = data['chatRoomData'].username; // Access username from resolver
      this.room = data['chatRoomData'].room; // Access room from resolver
      this.initializeData(); // Call to initialize data
    });

    // const messagesDiv = document.getElementById('messages') as HTMLElement;
    // const username = this.chatRoomService.username;
    // const room = this.chatRoomService.room;
    // console.log("Username:", username);
    // console.log("Room:", room);

    //   messagesDiv.innerHTML += `<h4>Welcome to ${room}.</h4>`;
    //   messagesDiv.innerHTML += `<p>${username} has joined the room.</p>`;


    // // Listen for other users joining the room
    // this.chatRoomService.onUserJoined().subscribe((data: any) => {
    //   const { username } = data;
    //   this.displayJoinMessage(username);
    // });
  }

  initializeData() {
    const messagesDiv = document.getElementById('messages') as HTMLElement;
    if (messagesDiv) {
      messagesDiv.innerHTML += `<h4>Welcome to ${this.room}.</h4>`;
      messagesDiv.innerHTML += `<p>${this.username} has joined the room.</p>`;
    }
    this.chatRoomService.onUserJoined().subscribe((data: any) => {
      const { username } = data;
      this.displayJoinMessage(username);
    });
  }

  displayJoinMessage(username: string) {
    const messagesDiv = document.getElementById('messages') as HTMLElement;
    if (messagesDiv) {
      // Create a new message element
      const messageElement = document.createElement('p');
      messageElement.textContent = `${username} has joined the room.`;
      messagesDiv.appendChild(messageElement);

      // Remove the message after 5 seconds
      setTimeout(() => {
        if (messagesDiv.contains(messageElement)) {
          messagesDiv.removeChild(messageElement);
        }
      }, 5000);
    }
  }
}
