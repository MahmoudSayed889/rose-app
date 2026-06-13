import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { SendEmailComponent } from "./send-email/send-email.component";
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'auth-library';
import { ActivatedRoute, Router } from '@angular/router';

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

  currentState: WritableSignal<'email' | 'verification' | 'password'> = signal('email');
  userEmail: WritableSignal<string> = signal('');
  userToken: WritableSignal<string> = signal('');
  sendEmailLoading: WritableSignal<boolean> = signal(false);

  onEmailSubmit(email: string): void {
    this.userEmail.set(email);

    this.sendEmail();
  }
  sendEmail(): any {
    if (this.userEmail()) {
      this.sendEmailLoading.set(true);
      const data = {
        email: this.userEmail()
      }
      this._authService.RequestPasswordReset(data).subscribe({
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
    const data = {
      token: this.userToken(),
      ...passwordForm.value
    }
    
    this.resetPassword(data);
  }
  resetPassword(data: any): any {
    if(data) {
      this._authService.ResetPassword(data).subscribe({
        next: (res) => {
          console.log(res);
          this.redirectToLogin();
        },
        error: (err) => {
          console.log(err);
          
        }
      })
    }
  }

  // resetPasswordForm: FormGroup = this._fb.group({
  //   token: [null, [Validators.required]],
  //   newPassword: [null, [Validators.required]],
  //   confirmPassword: [null, [Validators.required]]
  // })



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
