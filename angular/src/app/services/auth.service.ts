import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  constructor(private http: HttpClient, private router:Router) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  logout(){
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    console.log('Logged out');
    this.router.navigate(['/login']);
  }

  saveToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  saveUserId(userId:number){
    localStorage.setItem('userId',userId.toString()); //parseInt(userId,10)
  }

  getToken(): string {
    return localStorage.getItem('jwtToken')!;
  }

  getUserId(): number{
    return Number(localStorage.getItem('userId'));
  }
}
