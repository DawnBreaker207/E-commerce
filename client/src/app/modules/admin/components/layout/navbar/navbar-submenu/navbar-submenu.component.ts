import { SubMenuItem } from '@/app/shared/models/menu.model';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'div[navbar-submenu]',
  standalone: true,
  imports: [NgFor, NgTemplateOutlet, RouterLinkActive, RouterLink, NgIf, AngularSvgIconModule, MatIconModule],
  templateUrl: './navbar-submenu.component.html',
  styleUrl: './navbar-submenu.component.css',
})
export class NavbarSubmenuComponent implements OnInit {
  @Input() public submenu = <SubMenuItem[]>{};
  @ViewChild('submenuRef') submenuRef: ElementRef<HTMLDivElement> | undefined;
  constructor() {}
  ngOnInit(): void {}

  ngAfterViewInit() {
    /**
     * check if component is out of the screen
     */
    if (this.submenuRef) {
      const submenu = this.submenuRef.nativeElement.getBoundingClientRect();
      const bounding = document.body.getBoundingClientRect();

      if (submenu.right > bounding.right) {
        const childrenElement = this.submenuRef.nativeElement.parentNode as HTMLElement;
        if (childrenElement) {
          childrenElement.style.left = '-100%';
        }
      }
    }
  }
}
