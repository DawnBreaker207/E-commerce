import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarSubmenuComponent } from '../sidebar-submenu/sidebar-submenu.component';
import { MatIconModule } from '@angular/material/icon';
import { SubMenuItem } from '@/app/shared/models/menu.model';
import { MenuService } from '@/app/modules/admin/services/menu.service';
@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [
    NgFor,
    NgClass,
    AngularSvgIconModule,
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf,
    SidebarSubmenuComponent,
    MatIconModule,
  ],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuComponent implements OnInit {
  constructor(public menuService: MenuService) {}

  public toggleMenu(subMenu: SubMenuItem) {
    this.menuService.toggleMenu(subMenu);
  }

  ngOnInit(): void {}
}
