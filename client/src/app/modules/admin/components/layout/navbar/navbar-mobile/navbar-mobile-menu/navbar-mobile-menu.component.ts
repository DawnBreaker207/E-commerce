import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NavbarMobileSubmenuComponent } from '../navbar-mobile-submenu/navbar-mobile-submenu.component';
import { MenuService } from '@/app/modules/admin/services/menu.service';
import { SubMenuItem } from '@/app/shared/models/menu.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar-mobile-menu',
  standalone: true,
  imports: [
    NgFor,
    NgClass,
    AngularSvgIconModule,
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf,
    NavbarMobileSubmenuComponent,
    MatIconModule
  ],
  templateUrl: './navbar-mobile-menu.component.html',
  styleUrl: './navbar-mobile-menu.component.css',
})
export class NavbarMobileMenuComponent implements OnInit {
  constructor(public menuService: MenuService) {}

  public toggleMenu(submenu: SubMenuItem) {
    this.menuService.toggleMenu(submenu);
  }

  public closeMenu() {
    this.menuService.showMobileMenu = false;
  }

  ngOnInit(): void {}
}
