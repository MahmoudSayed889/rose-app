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
  phone: string;
  firstName: string;
  lastName: string;
  gender: string;
  photo: null;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
