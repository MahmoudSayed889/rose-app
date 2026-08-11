import { inject, Injectable } from '@angular/core';
import { AUTH_API_URL } from 'auth-library';

@Injectable({
  providedIn: 'root',
})
export class AccountSettingsEndPoints {
  private readonly _baseURL = inject(AUTH_API_URL);

  readonly GetUserProfile = `${this._baseURL}/api/users/profile`;
  readonly UpdateProfile = `${this._baseURL}/api/users/profile`;
  readonly ChangePassword = `${this._baseURL}/api/users/change-password`;
  readonly DeleteAccount = `${this._baseURL}/api/users/account`;
  readonly RequestEmailChange = `${this._baseURL}/api/users/email/request`;
  readonly ConfirmEmailChange = `${this._baseURL}/api/users/email/confirm`;
}
