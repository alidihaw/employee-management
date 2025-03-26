import { Routes } from '@angular/router';
import { AuthGuard } from '../@core/guard/auth.guard';
import { NoAuthGuard } from '../@core/guard/no-auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'employees',
    loadComponent: () =>
      import('./employees/feature/employees.component').then(
        (m) => m.EmployeesComponent
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./employees/ui/employeesdetail/employeesdetail.component').then(
        (m) => m.EmployeesDetailComponent
      ),
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    loadComponent: () =>
      import('./notfound/notfound.component').then((m) => m.NotFoundComponent),
  },
  { path: '**', redirectTo: '/404' },
];