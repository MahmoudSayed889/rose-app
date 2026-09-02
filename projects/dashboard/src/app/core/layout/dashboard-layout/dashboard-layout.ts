import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from '../toolbar/toolbar';
import { Sidebar } from '../sidebar/sidebar';
import { AppSidebarItem } from '../models/sidebar.interface';

// Keep in sync with the breakpoint in dashboard-layout.scss.
@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, Toolbar, Sidebar],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.scss',
})
export class DashboardLayout {
  protected readonly navItems: AppSidebarItem[] = [
    { id: 'overview', label: 'sidebar.nav.overview', icon: 'pi pi-th-large', routerLink: '/overview' },
    { id: 'categories', label: 'sidebar.nav.categories', icon: 'pi pi-clipboard', routerLink: '/categories' },
    { id: 'occasions', label: 'sidebar.nav.occasions', icon: 'pi pi-calendar', routerLink: '/occasions' },
    { id: 'products', label: 'sidebar.nav.products', icon: 'pi pi-box', routerLink: '/products' },
  ];
}
