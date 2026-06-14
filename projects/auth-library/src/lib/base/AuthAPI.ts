import { Observable } from 'rxjs';
import {
  ConfirmOtpREQ,
  ConfirmOtpRES,
  RegisterREQ,
  RegisterRES,
  SendOtpToEmailREQ,
  SendOtpToEmailRES,
} from '../interfaces/register';
import { LoginREQ, LoginRES } from '../interfaces/login';
import { ForgotPasswordRES, RequestPasswordResetREQ, ResetPasswordREQ } from '../interfaces/forgotpass';

export abstract class AuthAPI {
  abstract sendEmailVerification(email: string): Observable<SendOtpToEmailRES>;
  abstract confirmEmailVerification(email: string, code: string): Observable<ConfirmOtpRES>;
  abstract register(payload: RegisterREQ): Observable<RegisterRES>;
  abstract SendOtpToEmail(data: SendOtpToEmailREQ): Observable<SendOtpToEmailRES>;
  abstract ConfirmOtp(data: ConfirmOtpREQ): Observable<ConfirmOtpRES>;
  abstract Register(data: RegisterREQ): Observable<RegisterRES>;
  abstract Login(data: LoginREQ): Observable<LoginRES | string>;
  abstract RequestPasswordReset(data: RequestPasswordResetREQ): Observable<ForgotPasswordRES | string>;
  abstract ResetPassword(data: ResetPasswordREQ): Observable<ForgotPasswordRES | string>;
}
