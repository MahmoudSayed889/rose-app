import { Component, effect, inject, signal } from '@angular/core';
import { LoginComponent } from '../../../features/auth/components/login/login.component';
import { TranslatePipe } from '@ngx-translate/core';
import { RegisterComponent } from '../../../features/auth/components/register/register.component';
import { MenuItem } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { LanguageSwitcherComponent, ThemeSwitcherComponent, ButtonComponent } from 'reusable-components';
import { LucideAngularModule, icons } from 'lucide-angular';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { NavbarItem } from './models/navbar-item';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AppComponentBase } from '../../app-component-base';

@Component({
  selector: 'app-header',
  imports: [
    TranslatePipe,
    LoginComponent,
    RegisterComponent,
    DialogModule,
    MenubarModule,
    MenuModule,
    CommonModule,
    LanguageSwitcherComponent,
    ThemeSwitcherComponent,
    ButtonComponent,
    LucideAngularModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent extends AppComponentBase {

  private readonly _userService = inject(UserService)

  user = signal<User | null>(null)

  userMenuItems: MenuItem[] = [];
  notificationItems: MenuItem[] = [];
  secondNavbarItems: NavbarItem[] = [];

  visible = signal<boolean>(false)
  activeTap: 'login' | 'register' = 'login';

  icons = icons

  constructor() {
    super();

    effect(() => {
      if (this.isAuthenticated() && !this.user()) {
        this.getUser();
      }

      if (!this.isAuthenticated()) {
        this.user.set(null);
      }
    });
  }

  ngOnInit() {
    this.notificationItems = [
      { label: 'Your Order Has Been Shipped', icon: 'pi pi-check-circle' }
    ];

    // second navbar
    this.secondNavbarItems = [
      { label: 'home.title', icon: icons.House, routerLink: '/home' },
      { label: 'products.title', icon: icons.Gift, routerLink: '/products' },
      { label: 'categories.title', icon: icons.ClipboardList, routerLink: '/categories' },
      { label: 'occasions.title', icon: icons.PartyPopper, routerLink: '/occasions' },
      { label: 'contact.title', icon: icons.Headset, routerLink: '/contact' },
      { label: 'about.title', icon: icons.Info, routerLink: '/about' }
    ];
  }

  getUser() {
    this._userService.getUser().subscribe({
      next: (res) => {
        this.user.set(res.payload.user)
        this.visible.set(false);

        this.userMenuItems = [
          { label: `${this.user()?.firstName} ${this.user()?.lastName}`, linkClass: 'text-primary!' },
          { separator: true },
          { label: 'Account', icon: 'pi pi-user' },
          { label: 'Addresses', icon: 'pi pi-map-marker' },
          { label: 'Orders', icon: 'pi pi-shopping-bag' },
          { label: 'Dashboard', icon: 'pi pi-cog' },
          { separator: true },
          { label: 'Log out', icon: 'pi pi-sign-out', command: () => {this._authService.logout()} }
        ];
      }
    })
  }

  showDialog(tab: 'login' | 'register' = 'login') {
    this.activeTap = tab;
    this.visible.set(true);
  }
}
