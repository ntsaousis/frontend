import { Component, OnInit } from '@angular/core';
import { WardenService } from '../../core/services/warden.service';
import { Student, Room } from '../../shared/interfaces/app';
import { StudentService } from '../../core/services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-warden-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './warden-dashboard.component.html',
  styleUrls: ['./warden-dashboard.component.css'],
})
export class WardenDashboardComponent implements OnInit {
  students: Student[] = [];
  rooms: Room[] = [];
  selectedStudentId: number | null = null;
  selectedRoomId: number | null = null;

  constructor(private wardenService: WardenService,
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
      next: (data) => (this.students = data),
      error: (err) => console.error('Error fetching students:', err),
    });
  }

  /**
   * Fetch available rooms
   */
  fetchRooms(): void {
    this.wardenService.getAllRooms().subscribe({
      next: (data) => (this.rooms = data),
      error: (err) => console.error('Error fetching rooms:', err),
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
        },
        error: (err) => console.error('Assignment failed:', err),
      });
    }
  }

  unassignStudent(studentId: number): void {
    console.log(`Trying to unassign student with ID: ${studentId}`);
    
    if (confirm('Are you sure you want to unassign this student from the room?')) {
      this.wardenService.unassignStudent(studentId).subscribe(() => {
        console.log(studentId)
        alert('Student unassigned successfully');
        this.fetchStudents(); 
        this.fetchRooms();
      });
    }
  }

  deleteStudent(studentId: number): void {
    console.log(`Trying to delete student with ID: ${studentId}`);
    
    if (confirm('Are you sure you want to delete this student permantly?')) {
      this.wardenService.deleteStudent(studentId).subscribe(() => {
        console.log(studentId)
        alert('Student deleted successfully');
        this.fetchStudents(); // Refresh the list
      });
    }
  }
}
