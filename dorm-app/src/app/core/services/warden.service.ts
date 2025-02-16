import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student, Room } from '../../shared/interfaces/app';

const API_URL = 'http://localhost:8080/api'

@Injectable({
  providedIn: 'root'
})
  
  
export class WardenService {

  constructor(private http: HttpClient) { }

  /**
   * Fetch all students from backend
   */
  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${API_URL}/students`);
  }

  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${API_URL}/rooms`);
  }

  assignStudentToRoom(studentId: number, roomId: number): Observable<any> {
    
    return this.http.post(`${API_URL}/wardens/assign`, { studentId, roomId });
  }

  unassignStudent(studentId: number): Observable<Student> {
    
  
    return this.http.put<Student>(`${API_URL}/wardens/unassign/${studentId}`, {} );
  }

  deleteStudent(studentId: number): Observable<Student> {
    return  this.http.delete<Student>(`${API_URL}/wardens/students/${studentId}`, {})
  }
  
}


