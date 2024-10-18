import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { RegisterComponent } from './components/auth/register/register.component';

export const routes: Routes = [ { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login on load
    { path: 'login', component: LoginComponent }, // Route for login page
    { path: 'register', component: RegisterComponent },
    { path: 'chat', component: ChatRoomComponent }, // Route for chat page
    { path: '**', redirectTo: '/login' },];
