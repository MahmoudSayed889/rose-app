export interface SendOtpToEmailREQ {
  email: string;
}

export interface SendOtpToEmailRES {
  status: boolean;
  code: number;
  message: string;
  payload: string;
}

export interface ConfirmOtpREQ {
  email: string;
  code: string;
}

export interface ConfirmOtpRES {
  status: boolean;
  code: number;
  message: string;
  payload: string;
}

export interface RegisterREQ {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  gender: string;
}

export interface RegisterRES {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  token: string;
  role: string;
}
