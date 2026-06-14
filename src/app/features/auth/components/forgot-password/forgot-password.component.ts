import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { SendEmailComponent } from "./send-email/send-email.component";
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { FormGroup } from '@angular/forms';
import { AuthService, RequestPasswordResetREQ, ResetPasswordREQ } from 'auth-library';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-forgot-password',
  imports: [SendEmailComponent, ConfirmEmailComponent, ResetPasswordComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _destoryRef = inject(DestroyRef);

  currentState: WritableSignal<'email' | 'verification' | 'password'> = signal('password');
  userEmail: WritableSignal<string> = signal('user@example.com');
  userToken: WritableSignal<string> = signal('');
  sendEmailLoading: WritableSignal<boolean> = signal(false);
  resetPasswordLoading: WritableSignal<boolean> = signal(false);

  onEmailSubmit(email: string): void {
    this.userEmail.set(email);

    this.sendEmail();
  }
  sendEmail(): void {
    if (this.userEmail()) {
      this.sendEmailLoading.set(true);
      const data: RequestPasswordResetREQ = {
        email: this.userEmail()
      }

      this._authService.RequestPasswordReset(data)
        .pipe(takeUntilDestroyed(this._destoryRef))
        .subscribe({
          next: (res) => {
            this.sendEmailLoading.set(false);
            console.log(res);
            this.currentState.set('verification');
          },
          error: (err) => {
            this.sendEmailLoading.set(false);
            console.log(err);
          }
        })
    }
  }

  redirectToLogin(): void {
    this._router.navigate(['login']);
  }
  onPasswordSubmit(passwordForm: FormGroup): void {
    const data: ResetPasswordREQ = {
      token: this.userToken(),
      ...passwordForm.value
    }

    this.resetPassword(data);
  }
  resetPassword(data: ResetPasswordREQ): void {
    if (data) {
      this.resetPasswordLoading.set(true);
      this._authService.ResetPassword(data)
        .pipe(takeUntilDestroyed(this._destoryRef))
        .subscribe({
          next: (res) => {
            this.resetPasswordLoading.set(false);
            console.log(res);
            this.redirectToLogin();
          },
          error: (err) => {
            this.resetPasswordLoading.set(false);
            console.log(err);
          }
        })
    }
  }

  onVerificationStateChanged(newState: string): void {
    if (newState == 'email') {
      this.currentState.set(newState)
    }
  }

  checkUserToken(): void {
    const urlToken = this._activatedRoute.snapshot.queryParamMap.get('token');
    if (urlToken) {
      this.userToken.set(urlToken);
      this.currentState.set('password');
    }
  }
  ngOnInit(): void {
    this.checkUserToken();
  }
}
