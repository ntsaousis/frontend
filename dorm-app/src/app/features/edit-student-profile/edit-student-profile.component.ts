import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../../core/services/student.service';
import { AuthService } from '../../core/services/auth.service';
import { StudentUpdate } from '../../shared/interfaces/app';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ErrorService } from '../../core/services/error.service';

@Component({
  selector: 'app-edit-student-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './edit-student-profile.component.html',
  styleUrls: ['./edit-student-profile.component.css'] 
})
export class EditStudentProfileComponent implements OnInit {
  editProfileForm = new FormGroup({
    firstName: new FormControl({ value: '', disabled: true }),
    lastName: new FormControl({ value: '', disabled: true }),
    username: new FormControl({ value: '', disabled: true }),
    role: new FormControl({ value: '', disabled: true }),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  errorMessage: string | null = null; 

  constructor(
    private studentService: StudentService,
    private authService: AuthService,
    private errorService: ErrorService 
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId(); 
    console.log('User ID from token:', userId);

    if (!userId) {
      this.errorMessage = 'User ID is undefined!';
      console.error(this.errorMessage);
      return;
    }

    this.studentService.getStudentDetails(userId).subscribe({
      next: (profile) => {
        this.editProfileForm.patchValue({
          firstName: profile.user.firstName,
          lastName: profile.user.lastName,
          username: profile.user.username,
          role: profile.user.role,
          email: profile.user.email
        });
        this.errorMessage = null; 
      },
      error: (err) => {
        this.errorMessage = this.errorService.handleError(err, 'Failed to fetch student details');
        alert(this.errorMessage);
      }
    });
  }

  /**
   * Handles profile update submission
   */
  handleSubmit(): void {
    if (this.editProfileForm.valid) {
      const userId = this.authService.getUserId();
      if (!userId) {
        this.errorMessage = 'User ID is undefined!';
        console.error(this.errorMessage);
        return;
      }
  
      const updateData: StudentUpdate = { user: { email: this.editProfileForm.get('email')?.value || '' } };

      this.studentService.updateStudent(userId, updateData).subscribe({
        next: () => {
          alert('Email updated successfully!');
          this.errorMessage = null;
        },
        error: (err) => {
          this.errorMessage = this.errorService.handleError(err, 'Failed to update email');
          alert(this.errorMessage);
        }
      });
    }
  }
}
