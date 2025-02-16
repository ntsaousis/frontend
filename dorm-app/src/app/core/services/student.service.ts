import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student, StudentUpdate} from '../../shared/interfaces/app';

const API_URL = 'http://localhost:8080/api/students';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) { }
  
 /**
   * Fetch all students from backend
   */
  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${API_URL}`);
  }

  /**
   * Fetch the student details for the logged-in user.
   * @returns Observable with the student data.
   */
  getStudentDetails(userId: number): Observable<any> {
     
    return this.http.get<Student>(`${API_URL}/${userId}`);
  }

  // getStudentsinRoom(roomId: number): Observable<any> {
  //   return null;
  // }

  updateStudent(userId: number,updateData: StudentUpdate): Observable<any> {
    return this.http.put(`${API_URL}/${userId}`, updateData);
  }
  
}
