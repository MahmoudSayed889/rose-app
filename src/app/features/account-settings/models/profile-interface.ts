export interface getUserProfileRES {
  status: boolean;
  code: number;
  payload: Payload;
}

export interface Payload {
  user: ProfileUser;
}

export interface ProfileUser {
  id: string;
  username: string;
  email: string;
  phone: string | null;
  firstName: string;
  lastName: string;
  gender: string;
  photo: string | null;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateProfileREQ {
  firstName?: string;
  lastName?: string;
  phone?: string;
  photo?: string;
}

export interface UpdateProfileRES {
  status: boolean;
  code: number;
  payload: Payload;
}

export interface RequestEmailChangeREQ {
  newEmail: string;
}

export interface RequestEmailChangeRES {
  status: boolean;
  code: number;
  message: string;
}

export interface ConfirmEmailChangeREQ {
  code: string;
}

export interface ConfirmEmailChangeRES {
  status: boolean;
  code: number;
  payload: Payload;
}

export interface DeleteAccountRES {
  status: boolean;
  code: number;
  message: string;
}
