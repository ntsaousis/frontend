import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../../core/services/student.service';
import { AuthService } from '../../core/services/auth.service';
import { StudentUpdate } from '../../shared/interfaces/app';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-student-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
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

  constructor(
    private studentService: StudentService,
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId(); 
    console.log('User ID from token:', userId);

    if (!userId) {
      console.error('User ID is undefined!');
      return;
    }

    this.studentService.getStudentDetails(userId).subscribe((profile) => {
      this.editProfileForm.patchValue({
        firstName: profile.user.firstName,
        lastName: profile.user.lastName,
        username: profile.user.username,
        role: profile.user.role,
        email: profile.user.email
      });
    });
  }

  handleSubmit(): void {
    if (this.editProfileForm.valid) {
      const userId = this.authService.getUserId();
      if (!userId) {
        console.error('User ID is undefined!');
        return;
      }
  
      const updateData: StudentUpdate = { user: { email: this.editProfileForm.get('email')?.value || '' } };

      this.studentService.updateStudent(userId, updateData).subscribe({
        next: () => alert('Email updated successfully!'),
        error: (err) => alert('Failed to update email.'),
      });
    }
  }
}
