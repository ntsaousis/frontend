import { Routes } from '@angular/router';
import { RegisterComponent } from './features/register/register.component';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { WelcomeComponent } from './shared/components/welcome/welcome.component';
import { UnauthorizedComponent } from './features/unauthorized/unauthorized.component';
import { WardenDashboardComponent } from './features/warden-dashboard/warden-dashboard.component';
import { StudentDashboardComponent } from './features/student-dashboard/student-dashboard.component';
import { ComplaintsDashboardComponent } from './features/complaints-dashboard/complaints-dashboard.component';
import { EditStudentProfileComponent } from './features/edit-student-profile/edit-student-profile.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  
  { path: 'unauthorized', component: UnauthorizedComponent },
  {path: 'student-dashboard', 
    component: StudentDashboardComponent, 
    canActivate: [AuthGuard, RoleGuard], 
    data: { role: 'STUDENT' } 
  },
  {
    path: 'warden-dashboard', component: WardenDashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'WARDEN' }
  },
  { path: 'complaints-dashboard', component: ComplaintsDashboardComponent, canActivate: [AuthGuard] },
  {path: 'edit-student/:id', component: EditStudentProfileComponent, canActivate: [AuthGuard]}

];
