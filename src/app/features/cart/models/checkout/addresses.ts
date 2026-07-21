import { MainResponse } from "../../../../shared/models/main-response"

export type AddressesList = MainResponse<AddressesListPayload>

export interface AddressesListPayload {
    addresses: Address[]
}

export type SingleAddress = MainResponse<SingleAddressPayload>

export interface SingleAddressPayload {
    address: Address
}

export interface Address {
    id: string
    userId: string
    title: string
    isPrimary: boolean
    city: string
    street: string
    phone: string
    latitude: string
    longitude: string
    createdAt: string
    updatedAt: string
}

export interface CreateAddressRequest {
    title: string
    isPrimary: boolean
    city: string
    street: string
    phone: string
    latitude: number
    longitude: number
}

export interface DeleteAddressResponse {
    status: boolean
    code: number
    message: string
    payload: string
}