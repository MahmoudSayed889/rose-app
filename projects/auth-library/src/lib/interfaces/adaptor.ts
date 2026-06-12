import { BForgotpass } from "./back-interfaces/b-forgotpass";
import { BLogin } from "./back-interfaces/b-login";
import { BRegisterStep1_2, BRegisterStep3 } from "./back-interfaces/b-register";
import { ForgotPasswordRES } from "./forgotpass";
import { LoginRES } from "./login";
import { RegisterRES, SendOtpToEmailRES } from "./register";

export interface Adaptor {
    OtpStepsAdapt(data: BRegisterStep1_2): SendOtpToEmailRES;

    RegisterAdapt(data: BRegisterStep3): RegisterRES;

    LoginAdapt(data: BLogin): LoginRES;

    ForgotPassAdapt(data: BForgotpass): ForgotPasswordRES;
}
