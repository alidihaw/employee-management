import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AppData } from '../../../app.data';
import { Store } from '@ngxs/store';
import { EmployeesState } from '../../[data]/employees.state';
import { Employees } from '../../[data]/employees.interface';
import { RupiahPipe } from '../../../../@core/pipe/rupiah.pipe';

@Component({
  selector: 'app-employeesdetail',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RupiahPipe,],
  providers: [],
  templateUrl: './employeesdetail.component.html',
  styleUrls: ['./employeesdetail.component.scss']
})
export class EmployeesDetailComponent {
  $employees = inject(Store).select(EmployeesState.getDatas);

  employee!: Employees.Entity;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public appData: AppData,
  ) {
    const id = this.route.snapshot.params['id'];
    if (!id) {
      this.goBack();
    }
    this.$employees?.subscribe((a) => {
      if (a?.length > 0) {
        const employee = a.find((i) => i.username === id);
        console.log("employee", employee, a, id);
        if (!employee) {
          this.goBack();
          return;
        }
        this.employee = employee!;
      }
    })
  }

  goBack() {
    this.router.navigateByUrl('/');
  }
}
