import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  
loginForm = new FormGroup({
  username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]), // Example username validation
  password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]), // Example password validation with regex
});
  

  constructor(private authService: AuthService, private router: Router) {}

  handleLogin(): void {
    const loginData = {
      username: this.loginForm.get('username')!.value ?? '',
      password: this.loginForm.get('password')!.value ?? '',
    };

    this.authService.login(loginData).subscribe({
      next: () => {
        const dashboardRoute = this.authService.getDashboardRoute(); 
        this.router.navigate([dashboardRoute]); 
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Invalid username or password.');
      },
    });
  }
}
