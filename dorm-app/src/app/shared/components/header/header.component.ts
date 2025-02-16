import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  username: string | null = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log('User Logged In:', this.isLoggedIn);
    if (this.isLoggedIn) {
      this.username = this.authService.getUsername();
      console.log('Username:', this.username);// Παίρνει το username από το token
    }
  }

  onLogout(): void {
    this.authService.logout(); // Καθαρίζει το token
    this.router.navigate(['']); // Ανακατεύθυνση στη σελίδα login
  }
}
