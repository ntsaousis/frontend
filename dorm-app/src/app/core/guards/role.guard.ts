import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRole = route.data['role']; // Ο ρόλος που απαιτείται από το route
    const userRole = this.authService.getUserRole(); // Ο ρόλος του χρήστη

    if (userRole === requiredRole) {
      return true; // Ο χρήστης έχει τον σωστό ρόλο
    } else {
      this.router.navigate(['/unauthorized']); // Ανακατεύθυνση σε σελίδα μη εξουσιοδότησης
      return false;
    }
  }
}
