import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {
  private apiUrl = 'http://localhost:3000/chatrooms';  // Adjust as needed
  private socket = io('http://localhost:3000');  // WebSocket connection

  constructor(private http: HttpClient) { }

  getChatRooms(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createChatRoom(room: any): Observable<any> { //{name:string;userId:number}
    // const token = localStorage.getItem('jwtToken');
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}`
    // });
    return this.http.post(this.apiUrl, room); // room, {headers}
  }

  joinRoom(roomId: string) {
    this.socket.emit('joinRoom', roomId);
  }

  onUserJoined(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('userJoined', data => {
        observer.next(data);
      });
    });
  }

  leaveRoom(roomId: string) {
    this.socket.emit('leaveRoom', roomId);
  }
}

