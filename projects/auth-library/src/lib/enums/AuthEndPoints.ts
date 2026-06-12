import { inject, Injectable } from "@angular/core";
import { AUTH_API_URL } from "./tokens";

@Injectable({
  providedIn: 'root'
})

export class AuthEndPoints {
    private readonly _baseURL = inject(AUTH_API_URL)

    readonly SendOtpToEmail = `${this._baseURL}/api/auth/send-email-verification`;
    readonly ConfirmOtp = `${this._baseURL}/api/auth/confirm-email-verification`;
    readonly Register = `${this._baseURL}/api/auth/register`;
    readonly Login = `${this._baseURL}/api/auth/login`;
    readonly RequestPasswordReset = `${this._baseURL}/api/auth/forgot-password`;
    readonly ResetPassword = `${this._baseURL}/api/auth/reset-password`;
}