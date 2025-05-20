import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-bottom-navbar',
  standalone: true,
  imports: [AngularSvgIconModule, MatButtonModule, MatIconModule],
  templateUrl: './bottom-navbar.component.html',
  styleUrl: './bottom-navbar.component.css',
})
export class BottomNavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
