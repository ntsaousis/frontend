import { Component, OnInit } from '@angular/core';
import { WardenService } from '../../core/services/warden.service';
import { Student, Room } from '../../shared/interfaces/app';
import { StudentService } from '../../core/services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ErrorMessage } from '../../shared/interfaces/app';

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
    private studentService: StudentService
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
        this.errorMessage = null; // Clear error message on success
      },
      error: (err) => {
        this.handleError(err, 'Error fetching students');
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
        this.handleError(err, 'Error fetching rooms');
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
          this.handleError(err, 'Assignment failed');
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
          this.handleError(err, 'Unassignment failed');
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
          this.handleError(err, 'Student deletion failed');
        },
      });
    }
  }

  /**
   * Handles API errors by extracting backend messages
   */
  private handleError(error: any, defaultMsg: string): void {
    console.error(`${defaultMsg}:`, error);
    
    if (error.error) {
      try {
        const response: ErrorMessage = error.error; // Extract backend error response
        this.errorMessage = response.description || defaultMsg;
      } catch (e) {
        this.errorMessage = defaultMsg;
      }
    } else {
      this.errorMessage = defaultMsg;
    }

    alert(this.errorMessage); // Show error message in an alert
  }
}
