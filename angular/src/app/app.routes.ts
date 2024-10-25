import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { JoinedChatroomComponent } from './components/joined-chatroom/joined-chatroom.component';
import { ChatRoomResolverService } from './services/chat-room-resolver.service';

export const routes: Routes = [ { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login on load
    { path: 'login', component: LoginComponent }, // Route for login page
    { path: 'register', component: RegisterComponent },
    { path: 'chat', component: ChatRoomComponent }, // Route for chat page
    // { path: 'room', component: JoinedChatroomComponent, resolve:{chatRoomData: ChatRoomResolverService} },
    { path: '**', redirectTo: '/login' },];
