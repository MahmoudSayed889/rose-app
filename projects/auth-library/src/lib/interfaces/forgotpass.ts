export interface RequestPasswordResetREQ {
    email: string
}

export interface ResetPasswordREQ {
    token: string,
    newPassword: string,
    confirmPassword: string
}

export interface ForgotPasswordRES {
    message: string
}