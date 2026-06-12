export interface SendOtpToEmailREQ {
    email: string
}
export interface SendOtpToEmailRES {
    message: string
}


export interface ConfirmOtpREQ {
    email: string,
    code: number
}
export interface ConfirmOtpRES {
    message: string
}


export interface RegisterREQ {
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string,
    phone: string,
    gender: string
}
export interface RegisterRES {
    id: string,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    token: string,
    role: string
}
