import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import packageJson from '../../../../../../../package.json';
import { MenuService } from '../../../services/menu.service';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    AngularSvgIconModule,
    SidebarMenuComponent,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  public appJson: any = packageJson;

  constructor(public menuService: MenuService) {}
  ngOnInit(): void {}

  public toggleSidebar() {
    this.menuService.toggleSidebar();
  }
}
