import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../@core/loader/loader/loader.component';
import { AppData } from './app.data';
import { EmployeesService } from './employees/[data]/employees.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoaderComponent, RouterModule,],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {


  constructor(
    public appData: AppData,
    public router: Router,
    private employeesService: EmployeesService,
  ) {
    this.splashScreen();
  }


  logout() {
    // Clear authentication data
    localStorage.removeItem('isAuthenticated');
    this.appData.isLoggedIn = false;

    // Redirect to the login page
    this.router.navigate(['/']);
  }

  async ngOnInit() {
    this.appData.changesIsLoading(true);
    await this.getEmployees();
    setTimeout(() => {
      this.appData.changesIsLoading(false);
    }, 1000);
  }
  
  getEmployees() {
    return new Promise((resolve, reject) => {
      this.employeesService.getEmployees().subscribe((r) => {
        return resolve(r);
      }, (error) => {
        return resolve([]);
      })
    });
  }

  splashScreen() {
    let timeout = 500;
    const splashScreen = document?.getElementById('splashscreen');
    if (splashScreen) {
      setTimeout(() => {
        splashScreen.style.display = 'none';
      }, timeout);
    }
  }
}
