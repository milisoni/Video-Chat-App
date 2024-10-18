import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  username = '';
  password = '';
  successMessage : string ='';
  errorMessage : string ='';
 
  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.register({ username: this.username, password: this.password })
      .subscribe(response => {
        console.log('Registration successful');
        this.successMessage="User Registered Successfully. Please log in to proceed"
        this.router.navigate(['/login']);
      },
        (error) => {
          this.errorMessage="Registration failed";
          console.error('Registration failed', error);
        }
      );
  }
}
