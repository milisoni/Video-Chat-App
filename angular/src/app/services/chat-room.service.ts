import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

interface CreateChatRoomDto {
  name: string;
  userId: number;
}


@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {
  private apiUrl = 'http://localhost:3000/chatrooms';  // Adjust as needed
  private socket = io('http://localhost:3000');  // WebSocket connection
  

  public username: string = "";
  public room: string = "";

  constructor(private http: HttpClient, private router: Router) {
    this.socket = io('http://localhost:3000'); // Ensure the URL matches your server
    this.socket.on('connect', () => {
      console.log('Socket connected');
    });
  }

  getChatRooms(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createChatRoom(room: CreateChatRoomDto): Observable<any> { //{name:string;userId:number}
    const token = localStorage.getItem('jwtToken');
    console.log('Token:', token);
    const headers = token ? new HttpHeaders({
      'Authorization': `Bearer ${token}`
    }) : new HttpHeaders();;
    return this.http.post(this.apiUrl, room, { headers }); // room, {headers}
  }

  joinRoom(room: string, username: string) {
    this.username = username;
    this.room = room;
    console.log("Username:", this.username);
    console.log("Room:", this.room);

    this.socket.emit('joinRoom', { room, username });
    this.socket.emit('userJoined', { room, username });

    // this.router.navigate(['/room']);

  }

  onUserJoined(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('userJoined', data => {
        observer.next(data);
      });
    });
  }

  leaveRoom(room: string, username: string) {
    this.username = username;
    this.room = room;
    console.log( this.username, "has left the", this.room);

    this.socket.emit('leaveRoom', { room, username });
    this.socket.emit('userLeft', { room, username });
  }

  onUserLeft(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('userLeft', data => {
        observer.next(data);
      });
    });
  }


}

