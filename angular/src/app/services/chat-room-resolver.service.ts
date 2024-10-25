import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ChatRoomService } from './chat-room.service';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomResolverService implements Resolve<{username:string;room:string}>{

  constructor(private chatRoomService:ChatRoomService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ username: string; room: string }> {
    
    return new Observable(observer => {
      const username = this.chatRoomService.username; // Get username
      const room = this.chatRoomService.room; // Get room

      if (username && room) {
        observer.next({ username, room });
        observer.complete();
      } else {
        observer.error('No user data available');
      }
    });
  }
}
