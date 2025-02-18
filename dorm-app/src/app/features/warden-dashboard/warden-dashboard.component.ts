import { Component, OnInit } from '@angular/core';
import { WardenService } from '../../core/services/warden.service';
import { Student, Room } from '../../shared/interfaces/app';
import { StudentService } from '../../core/services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ErrorService } from '../../core/services/error.service';

@Component({
  selector: 'app-warden-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './warden-dashboard.component.html',
  styleUrls: ['./warden-dashboard.component.css'],
})
export class WardenDashboardComponent implements OnInit {
  students: Student[] = [];
  rooms: Room[] = [];
  selectedStudentId: number | null = null;
  selectedRoomId: number | null = null;
  errorMessage: string | null = null; // Stores error messages from backend

  constructor(
    private wardenService: WardenService,
    private studentService: StudentService,
    private errorService: ErrorService // ✅ Injecting the global error service
  ) {}

  ngOnInit(): void {
    this.fetchStudents();
    this.fetchRooms();
  }

  /**
   * Fetch students from backend
   */
  fetchStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.errorMessage = null; // ✅ Clear error message on success
      },
      error: (err) => {
        this.errorMessage = this.errorService.handleError(err, 'Error fetching students');
        alert(this.errorMessage);
      },
    });
  }

  /**
   * Fetch available rooms
   */
  fetchRooms(): void {
    this.wardenService.getAllRooms().subscribe({
      next: (data) => {
        this.rooms = data;
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = this.errorService.handleError(err, 'Error fetching rooms');
        alert(this.errorMessage);
      },
    });
  }

  /**
   * Assigns a student to a selected room
   */
  assignStudentToRoom(): void {
    console.log('Sending request:', this.selectedStudentId, this.selectedRoomId);
    if (this.selectedStudentId && this.selectedRoomId) {
      this.wardenService.assignStudentToRoom(this.selectedStudentId, this.selectedRoomId).subscribe({
        next: () => {
          alert('Student assigned successfully!');
          this.fetchStudents();
          this.fetchRooms();
          this.errorMessage = null;
        },
        error: (err) => {
          this.errorMessage = this.errorService.handleError(err, 'Assignment failed');
          alert(this.errorMessage);
        },
      });
    } else {
      this.errorMessage = 'Please select both a student and a room before assigning.';
    }
  }

  /**
   * Unassigns a student from their room
   */
  unassignStudent(studentId: number): void {
    console.log(`Trying to unassign student with ID: ${studentId}`);
    
    if (confirm('Are you sure you want to unassign this student from the room?')) {
      this.wardenService.unassignStudent(studentId).subscribe({
        next: () => {
          alert('Student unassigned successfully');
          this.fetchStudents();
          this.fetchRooms();
          this.errorMessage = null;
        },
        error: (err) => {
          this.errorMessage = this.errorService.handleError(err, 'Unassignment failed');
          alert(this.errorMessage);
        },
      });
    }
  }

  /**
   * Deletes a student permanently
   */
  deleteStudent(studentId: number): void {
    console.log(`Trying to delete student with ID: ${studentId}`);
    
    if (confirm('Are you sure you want to delete this student permanently?')) {
      this.wardenService.deleteStudent(studentId).subscribe({
        next: () => {
          alert('Student deleted successfully');
          this.fetchStudents();
          this.errorMessage = null;
        },
        error: (err) => {
          this.errorMessage = this.errorService.handleError(err, 'Student deletion failed');
          alert(this.errorMessage);
        },
      });
    }
  }
}
