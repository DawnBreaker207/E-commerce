import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet, Event } from '@angular/router';
import { FooterComponent } from './components/layout/footer/footer.component';
import { BottomNavbarComponent } from './components/layout/bottom-navbar/bottom-navbar.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent, SidebarComponent, BottomNavbarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  private mainContent: HTMLElement | null = null;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.mainContent) {
          this.mainContent!.scrollTop = 0;
        }
      }
    });
  }

  ngOnInit(): void {
    this.mainContent = document.getElementById('main-content');
  }
}
