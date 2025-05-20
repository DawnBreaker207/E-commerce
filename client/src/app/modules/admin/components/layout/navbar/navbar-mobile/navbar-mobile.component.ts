import { MenuService } from '@/app/modules/admin/services/menu.service';
import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NavbarMobileMenuComponent } from './navbar-mobile-menu/navbar-mobile-menu.component';

@Component({
  selector: 'app-navbar-mobile',
  standalone: true,
  imports: [NgClass, AngularSvgIconModule, NavbarMobileMenuComponent],
  templateUrl: './navbar-mobile.component.html',
  styleUrl: './navbar-mobile.component.css',
})
export class NavbarMobileComponent implements OnInit {
  constructor(public menuService: MenuService) {}

  ngOnInit(): void {}

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = false;
  }
}
