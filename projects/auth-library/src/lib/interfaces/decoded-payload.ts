export type UserRole = 'admin' | 'user';

export interface DecodedPayload {
    userId: string
    role: string
    iat: number
    exp: number
}