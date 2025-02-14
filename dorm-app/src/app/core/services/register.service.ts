// src/app/core/services/register.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest,  } from './../../shared/interfaces/app';

const API_URL = 'http://localhost:8080/api/register';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  registerStudent(data: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${API_URL}/student`, data);
  }

  registerWarden(data: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${API_URL}/warden`, data);
  }
}
