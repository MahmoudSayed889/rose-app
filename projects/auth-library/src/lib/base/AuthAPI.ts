import { Observable } from "rxjs";
import { ConfirmOtpREQ, ConfirmOtpRES, RegisterREQ, RegisterRES, SendOtpToEmailREQ, SendOtpToEmailRES } from "../interfaces/register";
import { LoginREQ, LoginRES } from "../interfaces/login";
import { ForgotPasswordRES, RequestPasswordResetREQ, ResetPasswordREQ } from "../interfaces/forgotpass";

export abstract class AuthAPI {
    abstract SendOtpToEmail(data: SendOtpToEmailREQ): Observable<SendOtpToEmailRES | string>;
    abstract ConfirmOtp(data: ConfirmOtpREQ): Observable<ConfirmOtpRES | string>;
    abstract Register(data: RegisterREQ): Observable<RegisterRES | string>;
    abstract Login(data: LoginREQ): Observable<LoginRES | string>;
    abstract RequestPasswordReset(data: RequestPasswordResetREQ): Observable<ForgotPasswordRES | string>;
    abstract ResetPassword(data: ResetPasswordREQ): Observable<ForgotPasswordRES | string>;
}
