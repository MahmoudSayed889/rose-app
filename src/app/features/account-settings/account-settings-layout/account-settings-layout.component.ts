import { Component, signal, WritableSignal } from '@angular/core';
import { icons } from 'lucide-angular';
import { ButtonComponent } from 'reusable-components';
import { AppComponentBase } from '../../../shared/app-component-base';
import { ProfileComponent } from '../pages/profile/profile.component';
import { ChangePasswordComponent } from "../pages/change-password/change-password.component";

type Page = 'profile' | 'change-password';

@Component({
  selector: 'app-account-settings-layout',
  imports: [ButtonComponent, ProfileComponent, ChangePasswordComponent],
  templateUrl: './account-settings-layout.component.html',
  styleUrl: './account-settings-layout.component.scss',
})
export class AccountSettingsLayoutComponent extends AppComponentBase {
  icons = icons;

  currentPage: WritableSignal<Page> = signal('profile');
  changePage(page: Page): void {
    this.currentPage.set(page);
  }
}
