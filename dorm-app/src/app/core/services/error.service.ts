import { Injectable } from '@angular/core';
import { ErrorMessage } from '../../shared/interfaces/app';

@Injectable({
  providedIn: 'root' // This makes it available throughout the app
})
export class ErrorService {
  
  /**
   * Extracts and returns a user-friendly error message from backend responses
   */
  handleError(error: any, defaultMsg: string): string {
    console.error(`${defaultMsg}:`, error);
    
    if (error.error) {
      try {
        const response: ErrorMessage = error.error; // Extract backend error response
        return response.description || defaultMsg;
      } catch (e) {
        return defaultMsg;
      }
    }
    
    return defaultMsg;
  }
}
