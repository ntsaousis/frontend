import {
  Component, inject
  
} from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
   router = inject(Router)

    constructor(
     
      private authService: AuthService
    ) {}


  onLogout(): void {
    this.authService.logout();
    this.router.navigate([''])
    
  }

}
