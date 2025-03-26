import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  providers: [],
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotFoundComponent {
  constructor(
    private router: Router,
  ) {
  }

  goBack() {
    this.router.navigateByUrl('/');
  }
}
