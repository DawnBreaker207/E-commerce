import { Component, Input, OnInit } from '@angular/core';

import { NgClass, NgFor, NgTemplateOutlet } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatIconModule } from '@angular/material/icon';
import { SubMenuItem } from '@/app/shared/models/menu.model';
import { MenuService } from '@/app/modules/admin/services/menu.service';
@Component({
  selector: 'app-sidebar-submenu',
  standalone: true,
  imports: [NgClass, NgFor, NgTemplateOutlet, RouterLinkActive, RouterLink, AngularSvgIconModule, MatIconModule],
  templateUrl: './sidebar-submenu.component.html',
  styleUrl: './sidebar-submenu.component.css',
})
export class SidebarSubmenuComponent implements OnInit {
  @Input() public submenu = <SubMenuItem>{};

  constructor(public menuService: MenuService) {}

  ngOnInit(): void {}

  public toggleMenu(menu: any) {
    this.menuService.toggleSubMenu(menu);
  }

  private collapse(item: Array<any>) {
    item.forEach((item) => {
      item.expanded = false;
      if (item.children) this.collapse(item.children);
    });
  }
}
