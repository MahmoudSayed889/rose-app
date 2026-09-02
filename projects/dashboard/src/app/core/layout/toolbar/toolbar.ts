import { Component, computed, inject, input } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuModule } from 'primeng/menu';
import type { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
// `reusable-components` resolves through its built `dist/` output, which Nx's lint boundary
// check misattributes as an app; the project itself is correctly typed "library".
// eslint-disable-next-line @nx/enforce-module-boundaries
import { LanguageSwitcherComponent, ThemeSwitcherComponent } from 'reusable-components';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-toolbar',
  imports: [BreadcrumbModule, MenuModule, ThemeSwitcherComponent, LanguageSwitcherComponent],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {
  private readonly _layoutService = inject(LayoutService);
  private readonly _translateService = inject(TranslateService);

  readonly items = this._layoutService.toolbarItems;

  /** Breadcrumb items carry i18n keys as their `label` — translate before rendering. */
  protected readonly translatedItems = computed<MenuItem[]>(() => {
    this._translateService.currentLang();

    return this.items().map((item) => ({
      ...item,
      label: item.label ? this._translateService.instant(item.label) : item.label,
    }));
  });

  readonly userName = input('Firstname Lastname');
  readonly userEmail = input('user-email@example.com');
  readonly userAvatar = input('temp-images/profile-picture.png');

  protected readonly userMenuItems = computed<MenuItem[]>(() => {
    this._translateService.currentLang();

    return [
      { label: this._translateService.instant('sidebar.userMenu.profile'), icon: 'pi pi-user' },
      { label: this._translateService.instant('sidebar.userMenu.logout'), icon: 'pi pi-sign-out' },
    ];
  });
}
