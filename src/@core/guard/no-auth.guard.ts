import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = !!localStorage.getItem('isAuthenticated'); // Check if user is authenticated
    if (isAuthenticated) {
      this.router.navigate(['/employees']); // Redirect to a default route if already authenticated
      return false;
    }
    return true;
  }
}