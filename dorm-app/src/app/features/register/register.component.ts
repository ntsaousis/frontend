import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from '../../core/services/register.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[@#$!%&*]).{8,}$/),
    ]),
    firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    vat: new FormControl('', [Validators.required, Validators.pattern(/^\d{9}$/)]),
    gender: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  });

  constructor(private registerService: RegisterService, private router : Router) {}

  handleSubmit(): void {
    const registerData = {
      user: {
        username: this.registerForm.get('username')?.value ?? ''.trim().toLowerCase(),
        password: this.registerForm.get('password')?.value ?? '',
        firstName: this.registerForm.get('firstName')?.value ?? '',
        lastName: this.registerForm.get('lastName')?.value ?? '',
        email: this.registerForm.get('email')?.value ?? ''.trim().toLowerCase(),
        genderType: this.registerForm.get('gender')?.value ?? '',
        role: this.registerForm.get('role')?.value ?? '',
        vat: this.registerForm.get('vat')?.value ?? '',
      },
    };
  
    if (registerData.user.role === 'STUDENT') {
      this.registerService.registerStudent(registerData).subscribe({
        next: () => alert('Student registered successfully!'),
        error: (err) => console.error('Registration failed:', err),
      });
    } else if (registerData.user.role === 'WARDEN') {
      this.registerService.registerWarden(registerData).subscribe({
        next: () => alert('Warden registered successfully!'),
        error: (err) => console.error('Registration failed:', err),
      });
    }
    this.router.navigate(['/login'])
    
  }
  
}
