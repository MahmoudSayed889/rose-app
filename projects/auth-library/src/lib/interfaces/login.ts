export interface LoginREQ {
    username: string,
    password: string
}
export interface LoginRES {
    id: string;
    username: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    role: string
    token: string;
}
