import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: (response) => {
          console.log('Response:', response)
          const accessToken = response.access_token;
          const userId = response.userId;
          if (accessToken) {
            this.authService.saveToken(accessToken); // Store JWT token
            this.authService.saveUserId(userId);
            // localStorage.setItem('token', accessToken); // Store JWT token
            
            console.log('token saved');
            this.router.navigate(['/chat']);
            // localStorage.setItem('token', response.access_token); // Store JWT token
            // this.router.navigate(['/chat']);
            // console.log('token saved');
          }  // Save the token locally

        },
        error: (error: Error) => {
          console.error('Login failed', error);
          this.errorMessage = 'Login Failed. Please Check your Credentials.';
        }
      });
  }
}
