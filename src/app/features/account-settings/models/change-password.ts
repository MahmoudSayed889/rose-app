export interface ChangePasswordReq {
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
}

export interface ChangePasswordRes {
  code: number,
  message: string,
  status: boolean
}