import { MainResponse } from "../../../shared/models/main-response"
import { Metadata } from "../../../shared/models/metadata"
import { User } from "../../../shared/models/user"
import { Address } from "../../cart/models/checkout/addresses"
import { Coupon } from "../../cart/models/coupon"
import { Product } from "../../products/models/product"

export type OrderesList = MainResponse<OrderesListPayload>

export interface OrderesListPayload {
    data: Order[]
    metadata: Metadata
}

export type SingleOrder = MainResponse<SingleOrderPayload>

export interface SingleOrderPayload {
    order: Order
}

export interface Order {
    id: string
    userId: string
    addressId: string
    couponId: string
    status: string
    paymentMethod: string
    paymentStatus: string
    stripePaymentIntentId: any
    subtotal: string
    discount: string
    shipping: string
    total: string
    trackingNumber: any
    notes: string
    createdAt: string
    updatedAt: string
    user: User
    address: Address
    coupon: Coupon
    orderItems: OrderItem[]
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  price: string
  createdAt: string
  product: Product
}

export interface CreateOrderRequest {
    addressId: string
    paymentMethod: string
    couponCode: string
    notes: string
}