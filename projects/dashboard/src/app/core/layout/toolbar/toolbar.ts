import { Component, inject, input } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuModule } from 'primeng/menu';
import type { MenuItem } from 'primeng/api';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-toolbar',
  imports: [BreadcrumbModule, MenuModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {
  private readonly _layoutService = inject(LayoutService);

  readonly items = this._layoutService.toolbarItems;

  readonly userName = input('Firstname Lastname');
  readonly userEmail = input('user-email@example.com');
  readonly userAvatar = input('temp-images/profile-picture.png');

  protected readonly userMenuItems: MenuItem[] = [
    { label: 'Profile', icon: 'pi pi-user' },
    { label: 'Logout', icon: 'pi pi-sign-out' },
  ];
}
