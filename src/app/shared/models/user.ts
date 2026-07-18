import { MainResponse } from "./main-response"

export type SingleUser = MainResponse<SingleUserPayload>

export interface SingleUserPayload {
    user: User
}

export interface User {
    id: string
    username: string
    email: string
    phone: any
    firstName: string
    lastName: string
    gender: string
    photo: any
    emailVerified: boolean
    phoneVerified: boolean
    role: string
    createdAt: string
    updatedAt: string
}