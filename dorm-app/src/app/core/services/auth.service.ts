import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode} from 'jwt-decode';
import { LoginRequest } from '../../shared/interfaces/app';

const API_URL = 'http://localhost:8080/api/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  /**
   * Authenticates the user and stores the JWT token in localStorage.
   * @param data - The user login data (username and password).
   * @returns Observable with the backend response.
   */
  login(data: LoginRequest): Observable<any> {
    return this.http.post<{ token: string }>(`${API_URL}/authenticate`, data).pipe(
      tap((response) => {
        // Store the token in localStorage
        localStorage.setItem('token', response.token);
      })
    );
  }

  /**
   * Checks if the user is logged in by verifying the presence of a JWT token in localStorage.
   * @returns True if a token exists, false otherwise.
   */
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
  
    try {
      const decodedToken: any = jwtDecode(token);
      const expiration = decodedToken.exp * 1000; 
      return Date.now() < expiration;
    } catch (error) {
      console.error('Invalid token:', error);
      return false;
    }
  }

  /**
   * Retrieves the user's role from the JWT token.
   * @returns The user's role (e.g., STUDENT, WARDEN) or null if not available.
   */
  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token); // Decode the JWT
        return decodedToken.role; // Return the user's role
      } catch (error) {
        console.error('Error decoding token:', error);
        return null; // Return null if decoding fails
      }
    }
    return null; // Return null if no token exists
  }


  /**
   * Retrieves the user's ID from the JWT token.
   * @returns The user's ID or null if not available.
   */
  getUserId(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token); // Decode the JWT
        return decodedToken.userId; // Return the user's ID
      } catch (error) {
        console.error('Error decoding token:', error);
        return null; // Return null if decoding fails
      }
    }
    return null; // Return null if no token exists
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.sub || null; 
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

   /**
   * Decodes the JWT token stored in localStorage.
   * @returns The decoded token object or null if the token is not valid.
   */
    getDecodedToken(): any | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        return jwtDecode(token); // Decode the JWT
      } catch (error) {
        console.error('Error decoding token:', error);
        return null; // Return null if decoding fails
      }
    }
    return null; // Return null if no token exists
  }

  /**
   * Determines the appropriate dashboard route based on the user's role.
   * @returns The route for the student's or warden's dashboard.
   */
  getDashboardRoute(): string {
    const role = this.getUserRole();
    if (role === 'STUDENT') {
      return '/student-dashboard';
    } else if (role === 'WARDEN') {
      return '/warden-dashboard';
    } else {
      return '/unauthorized';
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Logs the user out by clearing the JWT token from localStorage.
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
}
