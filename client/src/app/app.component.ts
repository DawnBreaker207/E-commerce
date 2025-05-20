import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';
import { ThemeService } from './core/services/theme.service';
import { NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ResponsiveHelperComponent, NgxSonnerToaster],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'microservices-shop-frontend';
  constructor(private readonly oidSecurityService: OidcSecurityService, public themeService: ThemeService) {}

  ngOnInit(): void {
    this.oidSecurityService.checkAuth().subscribe(({ isAuthenticated }) => {
      console.log('app authenticated', isAuthenticated);
    });
  }
}
