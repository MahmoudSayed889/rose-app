import { computed, inject, Injectable, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthEndPoints } from '../enums/AuthEndPoints';
import { AuthAdapt } from './adaptor/auth-adapt.service';
import {
  ConfirmOtpREQ,
  ConfirmOtpRES,
  RegisterREQ,
  RegisterRES,
  SendOtpToEmailREQ,
  SendOtpToEmailRES,
} from '../interfaces/register';
import { AuthAPI } from '../base/AuthAPI';
import { BRegisterStep1_2, BRegisterStep3 } from '../interfaces/back-interfaces/b-register';
import { LoginREQ, LoginRES } from '../interfaces/login';
import { BLogin } from '../interfaces/back-interfaces/b-login';
import { RequestPasswordResetREQ, ForgotPasswordRES, ResetPasswordREQ } from '../interfaces/forgotpass';
import { BForgotpass } from '../interfaces/back-interfaces/b-forgotpass';
import { CookieService } from 'ngx-cookie-service';


@Service()
export class AuthService implements AuthAPI {
  private readonly _httpClient = inject(HttpClient);
  private readonly _authAdapt = inject(AuthAdapt);
  private readonly _authEndPoints = inject(AuthEndPoints);
  private readonly _cookieService = inject(CookieService);

  readonly isAuthenticated = signal(
    this._cookieService.check('user')
  );

  sendEmailVerification(email: string): Observable<SendOtpToEmailRES> {
    return this.SendOtpToEmail({ email });
  }

  confirmEmailVerification(email: string, code: string): Observable<ConfirmOtpRES> {
    return this.ConfirmOtp({ email, code });
  }

  register(payload: RegisterREQ): Observable<RegisterRES> {
    return this.Register(payload);
  }

  SendOtpToEmail(data: SendOtpToEmailREQ): Observable<SendOtpToEmailRES> {
    return this._httpClient
      .post<BRegisterStep1_2>(this._authEndPoints.SendOtpToEmail, data)
      .pipe(map((res) => this.handleOtpStepResponse(res, (response) => this._authAdapt.OtpStepsAdapt(response))));
  }

  ConfirmOtp(data: ConfirmOtpREQ): Observable<ConfirmOtpRES> {
    return this._httpClient
      .post<BRegisterStep1_2>(this._authEndPoints.ConfirmOtp, data)
      .pipe(map((res) => this.handleOtpStepResponse(res, (response) => this._authAdapt.ConfirmOtpAdapt(response))));
  }

  Register(data: RegisterREQ): Observable<RegisterRES> {
    return this._httpClient.post<BRegisterStep3>(this._authEndPoints.Register, data).pipe(
      map((res) => {
        if (!res.status) {
          throw { error: { message: res.message } };
        }
        return this._authAdapt.RegisterAdapt(res);
      })
    );
  }

  Login(data: LoginREQ): Observable<LoginRES> {
    return this._httpClient
      .post<BLogin>(this._authEndPoints.Login, data)
      .pipe(map((res: BLogin) => this._authAdapt.LoginAdapt(res)));
  }

  RequestPasswordReset(data: RequestPasswordResetREQ): Observable<ForgotPasswordRES | string> {
    return this._httpClient
      .post<BForgotpass>(this._authEndPoints.RequestPasswordReset, data)
      .pipe(map((res) => this._authAdapt.ForgotPassAdapt(res)));
  }

  ResetPassword(data: ResetPasswordREQ): Observable<ForgotPasswordRES | string> {
    return this._httpClient
      .post<BForgotpass>(this._authEndPoints.ResetPassword, data)
      .pipe(map((res) => this._authAdapt.ForgotPassAdapt(res)));
  }

  private handleOtpStepResponse<T>(
    res: BRegisterStep1_2,
    adapt: (response: BRegisterStep1_2) => T
  ): T {
    if (!res.status) {
      throw { error: { message: res.message } };
    }
    return adapt(res);
  }

  logout(): void {
    this._cookieService.delete('user');
    this.isAuthenticated.set(false);
  }
}
