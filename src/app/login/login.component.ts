import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppData } from '../app.data';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  admin = {
    username: 'admin',
    password: 'Invalid@1'
  };
  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';

  constructor(private router: Router, private appData: AppData,) {

  }
  
  onSubmit() {
    if (!this.username || !this.password) {
      this.showSnackbar('Please enter both username and password.', 'error');
      return;
    }
    if (this.username !== this.admin.username || this.password !== this.admin.password) {
      this.showSnackbar('Invalid username or password.', 'error');
      return;
    }
    this.showSnackbar('Login successful!', 'success');
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      this.appData.isLoggedIn = true;
      this.router.navigateByUrl('/employees');
    }, 1000);
  }

  showSnackbar(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000); // Hide alert after 3 seconds
  }
}