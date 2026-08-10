type ChangePasswordReq = {
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
}

type ChangePasswordRes = {
  code: number,
  message: string,
  status: boolean
}