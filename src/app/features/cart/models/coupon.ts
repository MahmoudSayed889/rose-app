import { MainResponse } from "../../../shared/models/main-response"
import { Metadata } from "../../../shared/models/metadata";

export type CouponList = MainResponse<CouponListPayload>

export interface CouponListPayload {
    data: Coupon[]
    metadata: Metadata;
}

export interface Coupon {
    id: string
    code: string
    type: string
    value: string
    minPurchase: string
    maxDiscount: string
    usageLimit: number
    usedCount: number
    validFrom: string
    validUntil: string
    isActive: boolean
    immutable: boolean
    createdAt: string
    updatedAt: string
}