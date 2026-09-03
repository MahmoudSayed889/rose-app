import { Injectable, Service } from '@angular/core';
import { Adaptor } from '../../interfaces/adaptor';
import { ConfirmOtpRES, RegisterRES, SendOtpToEmailRES } from '../../interfaces/register';
import { BRegisterStep1_2, BRegisterStep3 } from '../../interfaces/back-interfaces/b-register';
import { BLogin } from '../../interfaces/back-interfaces/b-login';
import { LoginRES } from '../../interfaces/login';
import { BForgotpass } from '../../interfaces/back-interfaces/b-forgotpass';
import { ForgotPasswordRES } from '../../interfaces/forgotpass';

@Service()
export class AuthAdapt implements Adaptor {
  OtpStepsAdapt(data: BRegisterStep1_2): SendOtpToEmailRES {
    return {
      status: data.status,
      code: data.code,
      message: data.message,
      payload: data.payload,
    };
  }

  ConfirmOtpAdapt(data: BRegisterStep1_2): ConfirmOtpRES {
    return {
      status: data.status,
      code: data.code,
      message: data.message,
      payload: data.payload,
    };
  }

  RegisterAdapt(data: BRegisterStep3): RegisterRES {
    return {
      id: data.payload.user.id,
      username: data.payload.user.username,
      email: data.payload.user.email,
      firstName: data.payload.user.firstName,
      lastName: data.payload.user.lastName,
      phone: data.payload.user.phone,
      token: data.payload.token,
      role: data.payload.user.role,
    };
  }

  LoginAdapt(data: BLogin): LoginRES {
    return {
      id: data.payload.user.id,
      username: data.payload.user.username,
      email: data.payload.user.email,
      firstName: data.payload.user.firstName,
      lastName: data.payload.user.lastName,
      phone: data.payload.user.phone,
      role: data.payload.user.role,
      token: data.payload.token,
    };
  }

  ForgotPassAdapt(data: BForgotpass): ForgotPasswordRES {
    return {
      message: data.message,
    };
  }
}
