import { Component, effect, HostListener, inject, signal } from '@angular/core';
import { LoginComponent } from '../../../features/auth/components/login/login.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RegisterComponent } from '../../../features/auth/components/register/register.component';
import { MenuItem } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import {
  LanguageSwitcherComponent,
  ThemeSwitcherComponent,
  ButtonComponent,
} from 'reusable-components';
import { LucideAngularModule, icons } from 'lucide-angular';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarItem } from './models/navbar-item';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AppComponentBase } from '../../app-component-base';
import { AddressDialogComponent } from '../../../features/cart/pages/checkout/shipping-address/address-dialog/address-dialog.component';
import { AddressService } from '../../../features/cart/services/checkout/address.service';
import { Address } from '../../../features/cart/models/checkout/addresses';
import { CartFacadeService } from '../../../features/cart/services/cart/cart-facade.service';
import { WishlistFacadeService } from '../../../features/wishlist/services/wishlist-facade.service';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import { FormsModule } from '@angular/forms';
import { Popover } from 'primeng/popover';
import { timeInterval } from 'rxjs';
import { NotificationsComponent } from '../../../features/notifications/notifications.component';
import { NotificationsFacadeService } from '../../../features/notifications/services/notifications-facade.service';
import { OverlayModule, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { environment } from '../../../../environments/environment';

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
    RouterLinkActive,
    AddressDialogComponent,
    SearchDialogComponent,
    FormsModule,
    NotificationsComponent,
    OverlayModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent extends AppComponentBase {
  private readonly _addressService = inject(AddressService);
  private readonly _userService = inject(UserService);
  private readonly _cartFacadeService = inject(CartFacadeService);
  private readonly _wishlistFacadeService = inject(WishlistFacadeService);
  private readonly _translateService = inject(TranslateService);
  private readonly _router = inject(Router);
  protected readonly _notificationsFacade = inject(NotificationsFacadeService);
  private readonly sso = inject(ScrollStrategyOptions);

  user = signal<User | null>(null);
  address = signal<Address | null>(null);

  userMenuItems: MenuItem[] = [];
  secondNavbarItems: NavbarItem[] = [];

  visible = signal<boolean>(false);
  visibleAddressDialog = signal<boolean>(false);
  activeTap: 'login' | 'register' = 'login';

  icons = icons;

  cartItems = this._cartFacadeService.cartItems;
  wishlistItems = this._wishlistFacadeService.wishlistItems;

  notificationsCount = this._notificationsFacade.unreadNotificationsCount();

  searchVal = signal<string>('');
  visibleSearchDialog = signal<boolean>(false);

  constructor() {
    super();

    effect(() => {
      if (this.isAuthenticated() && !this.user()) {
        this.getUser();
        this._cartFacadeService.getCartItems();
        this._wishlistFacadeService.loadWishlist();
        this._notificationsFacade.getUnreadNotificationsCount();
      }

      if (!this.isAuthenticated()) {
        this.user.set(null);
      }
    });

    effect(() => {
      if (this.user()) {
        this.address.set(
          this._addressService.addresses().find((address) => address.isPrimary) ?? null,
        );
      }
    });
  }

  ngOnInit() {
    this.initSecondNavbarItems();

    if (this.isAuthenticated()) {
      this._translateService.onLangChange.subscribe(() => {
        this.initUserMenuItems();
      });
    }
  }

  getUser() {
    this._userService.getUser().subscribe({
      next: (res) => {
        this.user.set(res.payload.user);
        this.visible.set(false);

        this.initUserMenuItems();
      },
    });
  }

  initUserMenuItems() {
    this.userMenuItems = [
      { label: `${this.user()?.firstName} ${this.user()?.lastName}`, linkClass: 'text-primary!' },
      { separator: true },
      {
        label: this._translateService.instant('header.userMenuItems.Account'),
        icon: 'pi pi-user',
        command: () => {
          this._router.navigate(['/account-settings']);
        },
      },
      {
        label: this._translateService.instant('header.userMenuItems.Addresses'),
        icon: 'pi pi-map-marker',
      },
      {
        label: this._translateService.instant('header.userMenuItems.Orders'),
        icon: 'pi pi-shopping-bag',
        command: () => {
          this._router.navigate(['/orders']);
        },
      },
      {
        label: this._translateService.instant('header.userMenuItems.Dashboard'),
        icon: 'pi pi-cog',
        visible: this.user()?.role.toLocaleLowerCase() == 'admin',
        command: () => {
          window.location.href = environment.dashboardRemoteUrl
        }
      },
      { separator: true },
      {
        label: this._translateService.instant('header.userMenuItems.Log out'),
        icon: 'pi pi-sign-out',
        command: () => {
          this._authService.logout();
        },
      },
    ];
  }

  initSecondNavbarItems() {
    // second navbar
    this.secondNavbarItems = [
      { label: 'home.title', icon: icons.House, routerLink: '/home' },
      { label: 'products.title', icon: icons.Gift, routerLink: '/products' },
      { label: 'categories.title', icon: icons.ClipboardList, routerLink: '/categories' },
      { label: 'occasions.title', icon: icons.PartyPopper, routerLink: '/occasions' },
      { label: 'contact.title', icon: icons.Headset, routerLink: '/contact' },
      { label: 'about.title', icon: icons.Info, routerLink: '/about' },
    ];
  }

  showDialog(tab: 'login' | 'register' = 'login') {
    this.activeTap = tab;
    this.visible.set(true);
  }

  showAddressDialog() {
    this.visibleAddressDialog.set(true);
  }

  onFocus() {
    this.visibleSearchDialog.update((val) => (val = true));
  }

  onBlur() {
    setTimeout(() => {
      this.visibleSearchDialog.update((val) => (val = false));
    }, 100);
  }

  notificationsOpen = signal<boolean>(false);
  scrollStrategy = this.sso.close({ threshold: 10 });

  onOverlayKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.notificationsOpen.set(false);
    }
  }

  toggleNotificationsOpen(): void {
    this.notificationsOpen.update((v) => !v);
  }
}
