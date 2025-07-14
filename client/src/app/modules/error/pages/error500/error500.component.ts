import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';


@Component({
  selector: 'app-error500',
  standalone: true,
  imports: [AngularSvgIconModule, ButtonComponent],
  templateUrl: './error500.component.html',
  styleUrl: './error500.component.css',
})
export class Error500Component {
  constructor(private router: Router) {}

  goToHomePage() {
    this.router.navigate(['/']);
  }
}
