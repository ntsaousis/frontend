import { Component, inject, OnInit } from '@angular/core';
import { StudentService } from '../../core/services/student.service';
import { AuthService } from '../../core/services/auth.service';
import { Student } from '../../shared/interfaces/app';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ErrorService } from '../../core/services/error.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
})
export class StudentDashboardComponent implements OnInit {
  student!: Student;
  errorMessage: string | null = null; 
  router = inject(Router);

  constructor(
    private studentService: StudentService,
    private authService: AuthService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getDecodedToken().userId;
    console.log(userId);
    
    this.studentService.getStudentDetails(userId).subscribe({
      next: (data) => {
        this.student = data;
        this.errorMessage = null; 
      },
      error: (err) => {
        this.errorMessage = this.errorService.handleError(err, 'Error fetching student details');
        alert(this.errorMessage); 
      },
    });
  }

  /**
   * Handles user logout and navigation
   */
  onLogout(): void {
    try {
      this.authService.logout();
      this.router.navigate(['']);
    } catch (err) {
      this.errorMessage = this.errorService.handleError(err, 'Logout failed');
      alert(this.errorMessage);
    }
  }
}
