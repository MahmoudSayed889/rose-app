import { Component, inject, signal, WritableSignal } from '@angular/core';
import { icons } from 'lucide-angular';
import { ButtonComponent } from 'reusable-components';
import { AppComponentBase } from '../../../shared/app-component-base';
import { TranslatePipe } from '@ngx-translate/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-account-settings-layout',
  imports: [ButtonComponent, TranslatePipe, RouterLink, RouterOutlet],
  templateUrl: './account-settings-layout.component.html',
  styleUrl: './account-settings-layout.component.scss',
})
export class AccountSettingsLayoutComponent extends AppComponentBase {
  private router = inject(Router);

  icons = icons;

  currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  isActive(path: string): boolean {
    return this.currentUrl()?.includes(path) ?? false;
  }
}
