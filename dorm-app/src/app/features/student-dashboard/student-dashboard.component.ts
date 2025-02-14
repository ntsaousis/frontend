import { Component, inject, OnInit } from '@angular/core';
import { StudentService } from '../../core/services/student.service';
import { AuthService } from '../../core/services/auth.service';
import { Student } from '../../shared/interfaces/app';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
})
export class StudentDashboardComponent implements OnInit {
  student!: Student;
  router = inject(Router)

  constructor(
    private studentService: StudentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getDecodedToken().userId;
    console.log(userId);
    this.studentService.getStudentDetails(userId).subscribe({
      next: (data) => (this.student = data),
      error: (err) => console.error('Error fetching student details:', err),
    });
  }

  

  onLogout(): void {
    this.authService.logout();
    this.router.navigate([''])
    
  }
}
