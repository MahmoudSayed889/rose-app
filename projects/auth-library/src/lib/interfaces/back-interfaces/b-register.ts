export interface BRegisterStep1_2 {
    status: boolean,
    code: number,
    message: string
}


export interface BRegisterStep3 {
    status: boolean;
    code: number;
    payload: Payload;
}

export interface Payload {
    user: User;
    token: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    role: string;
    createdAt: Date;
}
