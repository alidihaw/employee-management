import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppData } from '../../../app/app.data';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, RouterOutlet,],
  providers: [],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  constructor(
    public appData: AppData,
  ) {
  }
}
